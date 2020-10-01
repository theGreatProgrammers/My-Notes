showNotes();


let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', (event) => {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    let addTitle = document.getElementById('addTitle');
    if (notes == null) {
        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);

    }
    let myObj = {
        title : addTitle.value, 
        text : addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    addTitle.value = '';
    showNotes();

});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach((element, index) => {
        html += `<div class="noteCard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete this Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h5>Nothing To Show Here. Use "Add a Note" to add a note</h5>`;
    }
}


function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let titleTxt = element.getElementsByTagName('h5')[0].innerText;
        if((cardTxt.includes(inputVal)) || (titleTxt.includes(inputVal))){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';

        }
    });
});