let notesCount = 0;
let notesID = 0;

function createNote(ID, text) {
    notesCount++;
    notesID++;
    
    localStorage.setItem(String(ID), text);

    const divOuter = document.createElement('div');
    divOuter.className = 'noteOuter';
    divOuter.id = ID;

    const noteName = document.createElement('label');
    noteName.className = 'noteName';
    noteName.id = `note-${ID}`;
    noteName.textContent = `Note №${ID}`;

    const div = document.createElement('div');
    div.className = 'note';

    const note = document.createElement('textarea');
    note.className = 'noteEdit';
    note.value = text;
    
    const button = document.createElement('button');
    button.className = 'delete';
    button.textContent = 'X';
    button.id = `delete-${ID}`;

    div.appendChild(note);
    div.appendChild(button);

    button.addEventListener('click', function() {
        divOuter.remove();
        localStorage.removeItem(divOuter.id);
        notesCount--;

        console.log(`Removed note №${divOuter.id}`);
    });

    note.addEventListener('input', function() {
        localStorage.setItem(divOuter.id, note.value);
    });
    
    if (notesCount != 1){
        const hr = document.createElement('hr');
        hr.className = 'noteSeparator';
        divOuter.appendChild(hr);
    }

    divOuter.appendChild(noteName);
    divOuter.appendChild(div);
    
    console.log(`Note №${ID}, text="${text}"`);

    return divOuter;
}

function deleteNotes(){
    console.log('START Deleting notes END');
    
    while(noteHolder.firstChild) {
        noteHolder.removeChild(noteHolder.firstChild);
    }
    
    localStorage.clear();
    
    notesCount = 0;
    notesID = 0;
}

function notesFromLocalStorage() {
    console.log('START Notes from local storage')
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        
        notesID = Math.max(notesID, Number(key));
        
        noteHolder.appendChild(createNote(key, value));
    }
    console.log('END Notes from local storage')
}

const input = document.getElementById('input');
const noteHolder = document.getElementById('noteHolder');
const createButton = document.getElementById('createNote');
const deleteAllButton = document.getElementById('delete-all');

createButton.addEventListener('click', function() {
    if (input.value != ''){
        noteHolder.appendChild(createNote(notesID, input.value));
        input.value = '';
    }
});

deleteAllButton.addEventListener('click', function() {
    deleteNotes();
});

notesFromLocalStorage();
