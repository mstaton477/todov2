import {toDoManager, domManipulator, notesManager} from './todoFunctions.js'

const display = document.querySelector('.main'); 
const openForm = document.querySelector('.new-todo'); 
const closeForm = document.querySelector('.close-new');
const overlayNew = document.querySelector('.overlay-new');
const addToDoForm = document.querySelector('.create-new');
const detailsPopup = document.querySelector('.details-popup'); 
const detailsOverlay = document.querySelector('.overlay-details');
const editForm = document.querySelector('.edit-popup'); 
const toDoFolders = document.querySelector('.todo-folder'); 
const createProject = document.querySelector('.create-new_project-submit'); 
const createNote = document.querySelector('.create_new-note-submit');
const newToDoLink = document.querySelector('#new-project-link');
const newNoteLink = document.querySelector('#new-note-link');
const newProjectLink = document.querySelector('#new-project-link'); 
const newToDoMenu = document.querySelector('#new-todo-menu');
const newProjectMenu = document.querySelector('#new-project-menu');
const newNoteMenu = document.querySelector('#new-note-menu');

const todos = JSON.parse(localStorage.getItem('todos')) || {
    "home": [],
    "today": [],
    "week": [],
    "Gym":[],
    "Study":[],
    "Work":[]                                              
    }

if (!localStorage.getItem('todos')) {
    todos.home.push(toDosManager.createToDo("brush teeth", "low", "2021-12-12", " with colgate", "home", true));
    todos.home.push(toDosManager.createToDo("get dressed", "high", "2021-11-11", "singlet cos its hot", "home"));
    todos.home.push(toDosManager.createToDo("feed jimmy", "medium", "2021-06-09", "only the finest bickies", "home", true));
    
    todos.today.push(toDosManager.createToDo("get mail", "medium", "2021-06-09", "im expecting something", "today"));
    todos.today.push(toDosManager.createToDo("cook dinner", "medium", "2021-06-09", "juicy steak", "today", true));
    
    todos.week.push(toDosManager.createToDo("sport", "medium", "2021-06-09", "", "week"));
    
    todos.Gym.push(toDosManager.createToDo("swim", "medium", "2021-06-09", "", "Gym", true));
    todos.Gym.push(toDosManager.createToDo("walk", "high", "2021-06-09", "", "Gym"));
    todos.Gym.push(toDosManager.createToDo("weights", "low", "2021-06-09", "", "Gym"));
        
    todos.Study.push(toDosManager.createToDo("learn webkit", "high", "2021-06-09", "", "Study", true));
    todos.Study.push(toDosManager.createToDo("learn react", "medium", "2021-06-09", "", "Study"));
    
    todos.Work.push(toDosManager.createToDo("get that report on johnson's desk", "low", "2021-06-09", "", "Work"));
}

const notes = JSON.parse(localStorage.getItem('notes')) || [];

if (!localStorage.getItem('notes')) {
    notes.push(notesManager.createNote("title", 'you can edit title and details in place'));
    notes.push(notesManager.createNote("books", 'go get some books'));
    notes.push(notesManager.createNote("shopping list", 'steak\ncheese\ntomatos\nsauce'));
    notes.push(notesManager.createNote("example note", 'example\nnote\nwith\nlots\nof\nlines\n'));
    notes.push(notesManager.createNote("another example note", 'example\nnote\nwith\neven\nmore\nlines\nthan\nthe\nlast\nnote'));
    notes.push(notesManager.createNote("another example note", 'example note to show off the pinterest style layout'));
    notes.push(notesManager.createNote("books", 'go get some more books'));
    notes.push(notesManager.createNote("one more example note", 'one\nmore\nexample\nnote'));
}

domManipulator.renderAllToDos(todos, display); 
domManipulator.renderProjectNames(todos, display); 

const projectsDiv = document.querySelector('.projects');
projectsDiv.scrollTop = 0; 

toDoFolders.forEach(folder => {
    folder.addEventListener('click', e => domManipulator.changeFolder(e, todos, display)); 
})

newToDoLink.addEventListener('click', () =>{
    newProjectMenu.style.display = "none"; 
    newNoteMenu.style.display = "none"; 
    newToDoMenu.style.display = "flex"; 
})

newProjectLink.addEventListener('click', ()=>{
    newToDoMenu.style.display = "none"; 
    newProjectMenu.style.display = "none"; 
    newNoteMenu.style.display = "flex"; 
})

openForm.addEventListener('click', () => {
    overlayNew.classList.toggle('overlay-new-invisible');
    addToDoForm.classList.toggle('create-new-open'); 
})


closeForm.addEventListener('click', () => {
    overlayNew.classList.toggle('overlay-new-invisible'); 
    addToDoForm.classList.toggle('create-new-open');

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    sleep(300),then(() => {
        addToDoForm.reset(); 
        domManipulator.removeActivePriority();

        document.querySelector('#new-project-menu').style.display = "none";
        document.querySelector('#new-note-menu').style.display = "none";
        document.querySelector('#new-todo-menu').style.display = "flex"; 

        domManipulator.resetActiveFormLink(); 
    })
})

addToDoForm.addEventListener('submit', e => {
    toDosManager.addNewToDo(e, todos, display, overlayNew, addToDoForm);
});

createProject.addEventListener('click', e => {
    toDosManager.addNewProject(e, todos, overlayNew, addToDoForm, display); 


    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    sleep(300).then(() => {
        domManipulator.resetActiveFormLink(); 
    })

})

createNote.addEventListener('click', e => {
    notesManager.addNewNote(e, notes, overlayNew, addToDoForm, display); 

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    sleep(300).then(() => {
        domManipulator.resetActiveFormLink(); 
    })
})


editForm.addEventListener('submit', e => {
    toDosManager.editToDo(e, todos, display, editOverlay, editForm);
})

const proiorityBtns = document.querySelectorAll('.creaete-new_priority-btn'); 
    proiorityBtns.forEach(btn => {
        btn.addEventListener('click', e =>{
            domManipulator.activePriority(e);
        });
    })

const closeDetails = document.querySelector('edit-popup_close'); 
closeDetails.addEventListener('click', () => {
    detailsPopup.classList.toggle("details-popup-open"); 
    detailsOverlay.classList.toggle("overlay-details-invisible"); 
})

const closeEdit = document.querySelector('.edit-popup__close');
closeEdit.addEventListener('click', () => {
    editPopup.classList.toggle("edit-popup-open");
    editOverlay.classList.toggle("overlay-edit-invisible");
})

document.querySelector('#notes-nav').addEventListener('click', () => notesManager.arrangeNotes(notes));
document.querySelector('#notes-nav').addEventListener('click', (e) => domManipulator.updateActiveNavMain(e));

let todoLinks = document.querySelectorAll('.nav_item--link'); 
todoLinks = Array.from(todoLinks); 
todoLinks.pop(); 

todoLinks.forEach(folder => {
    folder.addEventListener('click', e => domManipulator.changeFolder2(e, todos, display));
})

const mobileMenu = document.querySelector('menu-btn');
let mobileMenuOpen = false; 

mobileMenu.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    if(mobileMenuOpen) {
        document.querySelector('.side-bar').style.left = 0;
        document.querySelector('.menu-btn__icon--before').style.transform = "rotate(135deg)";
        document.querySelector('.menu-btn__icon--before').style.top = "2px";
        document.querySelector('.menu-btn__icon--after').style.transform = "rotate(-135deg)";
        document.querySelector('.menu-btn__icon--after').style.top = "-2px";
        document.querySelector('.menu-btn__icon').style.backgroundColor = "transparent";
    } else{
        document.querySelector('.side-bar').style.left = "140px";
        document.querySelector('.menu-btn__icon--before').style.transform = "rotate(0)";
        document.querySelector('.menu-btn__icon--before').style.top = "-6px";
        document.querySelector('.menu-btn__icon--after').style.transform = "rotate(0)";
        document.querySelector('.menu-btn__icon--after').style.top = "6px";
        document.querySelector('.menu-btn__icon').style.backgroundColor = "#f7f7f7";
    }
})

const createNewOptions = document.querySelectorAll('.create-new__options-items');
createNewOptions.forEach(option => {
    option.addEventListener('click', e => {
        createNewOptions.forEach(option => {
            option.classList.remove('create-new__options-items-active');
        });
        e.target.classList.add('create-new__options-items-active');
    });
})

console.log(todos)