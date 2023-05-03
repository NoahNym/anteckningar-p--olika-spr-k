const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note');
const notesList = document.querySelector('#notes');
const languageSelect = document.querySelector('#language');

let notes = [];

// Lägg till en ny anteckning
function addNote(event) {
    event.preventDefault();
    const noteText = noteInput.value.trim();
    if (noteText === '') return;

    notes.push({ text: noteText, language: languageSelect.value });
    saveNotes();
    noteInput.value = '';
    showNotes();
}

// Ta bort en anteckning
function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    showNotes();
}

// Visa alla anteckningar på det valda språket
function showNotes() {
    const filteredNotes = notes.filter(note => note.language === languageSelect.value);
    notesList.innerHTML = '';
    filteredNotes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note.text;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => deleteNote(index));
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    });
}

// Spara anteckningar i localstorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Ladda anteckningar från localstorage
function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        showNotes();
    }
}

// Lyssna på formuläret
form.addEventListener('submit', addNote);

// Lyssna på väljaren för språk
languageSelect.addEventListener('change', showNotes);

// Ladda anteckningar vid start
loadNotes();
