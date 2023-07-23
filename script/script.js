var addBtn = document.getElementById("addNote");
var activeNotes = document.getElementById("active");
var popup = document.getElementById("myPopup");
var btn = document.getElementById("btn1");
var updateIndex;
let notesList = [];
let doneList = [];

if (localStorage.getItem("notes") != null) {
    notesList = JSON.parse(localStorage.getItem("notes"));
    display(notesList);
}
if (localStorage.getItem("done") != null) {
    doneList = JSON.parse(localStorage.getItem("done"));
    displayDone(doneList);
}

function addNote() {
    var titleInput = document.getElementById("titleInput");
    var bodyInput = document.getElementById("bodyInput");
    if (btn.innerHTML=="Add") {
        if (titleInput.value!="" && bodyInput.value!="") {
            popup.classList.remove("show");
            notesList.push(
                {
                    title: titleInput.value,
                    body: bodyInput.value
                }
            );
        titleInput.value = "";
        bodyInput.value = "";
        removePopup();
        localStorage.setItem("notes", JSON.stringify(notesList));
        display(notesList);
        }
        else{
            document.getElementById("test").innerHTML = "Please Fill Data";
        }
    }
    else{
        console.log(false);
        if (titleInput.value!="" && bodyInput.value!="") {
            popup.classList.remove("show");
            notesList[updateIndex] = 
                {
                    title: titleInput.value,
                    body: bodyInput.value
                };
            console.log(notesList);
        titleInput.value = "";
        bodyInput.value = "";
        removePopup();
        localStorage.setItem("notes", JSON.stringify(notesList));
        display(notesList);
        updateIndex = undefined;
        btn.innerHTML="Add";
        }
        else{
            document.getElementById("test").innerHTML = "Please Fill Data";
        }
    }
}


function removePopup(){
    var popup = document.getElementById("myPopup");
    popup.classList.remove("show");
}
function display(arr){
    document.getElementById("cartona").innerHTML = "";
    for(i=0; i<arr.length; i++ ){
        document.getElementById("cartona").innerHTML+=
        //     activeNotes.innerHTML +=
    `
        <div class="active-note card m-2">
        <div class="card-header i-cont">
        <div class="ies">
            <i class="fa-solid fa-check" id="done" onclick="done(${i})"></i>
            <i class="fa-regular fa-pen-to-square id="update" onclick="updat(${i})"></i>
            <i class="fa-regular fa-trash-can" id="delete" onclick="delet(${i})"></i>
        </div>
            <p>${arr[i].title}</p>
        </div>
        <div class="card-body">
            <p>${arr[i].body}</p>
        </div>
        </div>
    `;
    }
}

function delet(i){
    notesList.splice(i,1);
    display(notesList);
    localStorage.setItem("notes", JSON.stringify(notesList));
}
function updat(i) {
    titleInput.value = notesList[i].title;
    bodyInput.value = notesList[i].body;
    btn.innerHTML="update";
    updateIndex = i;
    myFunction();
}
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.add("show");
}
function done(i){
    doneList.push(notesList[i]);
    console.log(doneList);
    displayDone(doneList);
    delet(i);
}
function displayDone(arr){
    document.getElementById("cartona2").innerHTML = "";
    for(i=0; i<arr.length; i++ ){
        document.getElementById("cartona2").innerHTML+=
        //     activeNotes.innerHTML +=
    `
        <div class="active-note card m-2">
        <div class="card-header i-cont">
        <div class="ies">
            <i class="fa-solid fa-check" id="done" "></i>
            
        </div>
            <p>${arr[i].title}</p>
        </div>
        <div class="card-body">
            <p>${arr[i].body}</p>
        </div>
        </div>
    `;
    }
    localStorage.setItem("done", JSON.stringify(doneList));
}