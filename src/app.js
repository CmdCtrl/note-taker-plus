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

//access DOM elements
const del = "fa-trash-alt";
const edit = "fa-cog";
let currentSelected = null;

noteContainer.addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.classList.contains(edit)) {
        const curr = e.target.closest('.note');
        const currText = curr.querySelector('.body-text').textContent;
        console.log(currText);
        //create a modal
        //allow user to fill and submit modalText
        //currText = modalText
    }
    if(e.target.classList.contains(del)) {
        const curr = e.target.closest('.note');
        curr.remove();
    }
    if(currentSelected === null){
        if(e.target.classList.contains('note-body') || e.target.classList.contains('body-text') ) {
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

            currentSelected = null;
            second = null;
        }
    } 
});
