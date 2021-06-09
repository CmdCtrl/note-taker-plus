const promptContainer = document.querySelector('.prompt-container');
const noteContainer = document.querySelector('.note-container');
const addBtn = document.querySelector('#add-btn');

//init 
class Note{
    constructor(body){
        this.body = body;
    }
}

//listen for click, validate user input
addBtn.addEventListener('click', (e) => {
    const noteText = document.querySelector('#note-text');

    if(noteText.value.length > 0){
        const newNote = new Note(noteText.value);
        addNote(newNote);
        noteText.value = '';
        noteText.focus();
    }
});

//add to DOM
function addNote(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `<div class="note-header">
                                <span class="note-delete"><i class="fas fa-trash-alt"></i></span>
                                <span class="note-edit"><i class="fas fa-cog"></i></span>
                             </div>
                             <div class="note-body">
                                <p class="body-text">${note.body}</p>
                             </div>`;
    
    noteContainer.appendChild(noteElement);
}

function publishEdit(note) {
    let editedText = note.querySelector('.note-text').value;

    note.addEventListener('click', (e) => {
        try{
            if(e.target.classList.contains('edit-btn')) {
                editedText = note.querySelector('.note-text').value;
                note.innerHTML = `<div class="note-header">
                <span class="note-delete"><i class="fas fa-trash-alt"></i></span>
                <span class="note-edit"><i class="fas fa-cog"></i></span>
            </div>
            <div class="note-body">
                <p class="body-text">${editedText}</p>
            </div>`

            note.classList.remove('edit-btn');
            isEditing = false;
            }
        } catch(err) {
            if(!err instanceof TypeError){
                console.warn(err);
            }
        }
    });
}

//global variables
const del = "fa-trash-alt";
const edit = "fa-cog";
let currentSelected = null;
let isEditing = false;

//event handling
noteContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains(edit) && !isEditing) {
        isEditing = true;
        const curr = e.target.closest('.note');
        const currText = curr.querySelector('.body-text').textContent;
        if(isEditing) {
            curr.innerHTML = `<div class="note-header">
                                <span class="note-delete"><i class="fas fa-trash-alt"></i></span>
                                <span class="note-edit"><i class="fas fa-cog"></i></span>
                              </div>
                              <div class="note-body">
                                <textarea cols="16" class="note-text">${currText}</textarea>
                                <button class="edit-btn">Publish Edit</button>
                              </div>`;
            publishEdit(curr);
        }
    }
    if(e.target.classList.contains(del)) {
        const curr = e.target.closest('.note');
        curr.remove();
    }
    if(currentSelected === null){
        if(e.target.classList.contains('note-body') || e.target.classList.contains('body-text')) {
            e.target.closest('.note').classList.add('onclick');
            currentSelected = e.target.closest('.note');
        }
    }
    else if (currentSelected != null){
        if(e.target.closest('.note') === currentSelected){
            e.target.closest('.note').classList.remove('onclick');
            currentSelected = null;
        } else {
            //swap condition
            let first = currentSelected.innerText;
            let second = e.target.closest('.note');
    
            //remove selections
            e.target.closest('.note').classList.remove('onclick');
            currentSelected.classList.remove('onclick');

            //perform HTML swap
            currentSelected.innerHTML = `<div class="note-header">
            <span class="note-delete"><i class="fas fa-trash-alt"></i></span>
            <span class="note-edit"><i class="fas fa-cog"></i></span>
            </div>
            <div class="note-body">
                <p class="body-text">${second.innerText}</p>
            </div>`;

            e.target.closest('.note').innerHTML = `<div class="note-header">
            <span class="note-delete"><i class="fas fa-trash-alt"></i></span>
            <span class="note-edit"><i class="fas fa-cog"></i></span>
            </div>
            <div class="note-body">
                <p class="body-text">${first}</p>
            </div>`;

            //update state
            currentSelected = null;
            second = null;
        }
    } 
});
