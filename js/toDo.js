let list = document.getElementById("todos_list");
let addButton = document.getElementById("todo_add_button");
let addInput = document.getElementById("todo_input");  

function createTodo() {
    let text = addInput.value;

    if(text === ""){
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    let paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.textContent = text;

    let remove = document.createElement("span");
    remove.classList.add("remove");
    remove.innerHTML = "&cross;";

    li.appendChild(checkbox);
    li.appendChild(paragraph);
    li.appendChild(remove);
    list.appendChild(li);

    addInput.value = "";
}

function showEditInput(paragraphElement) {
    let editInput = document.getElementsByName("editInput")[0];
    if (editInput){
        editInput.remove();
    }

    let input = document.createElement("input");
    input.type = "text";
    input.name = "editInput";
    input.value = paragraphElement.textContent;
    input.classList.add("editInput");

    paragraphElement.parentElement.appendChild(input);
    input.focus();
}

function updateTodo() {
    let editInput = document.getElementsByName("editInput")[0];
    if (!editInput){
        return;
    }

    let newText = editInput.value;

    if (newText !== "") {
        let paragraph = editInput.parentElement.querySelector(".paragraph");
        paragraph.textContent = newText;
    }
    editInput.remove();
}

function removeTodo(removeElement) {
    removeElement.parentElement.remove();
}

function toggleComplete(inputElement) {
    if (inputElement.checked === false){
        inputElement.parentElement.classList.remove("complete");
    }else{
        inputElement.parentElement.classList.add("complete");
    }
}

list.addEventListener("click", function(e) {
    e.stopPropagation();

    switch(e.target.tagName){
        case "p":
            showEditInput(e.target);
            break;
        case "SPAN":
            removeTodo(e.target);
            break;
    }
});

list.addEventListener("change", function(e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox"){
        toggleComplete(e.target);
    }
});

list.addEventListener("keypress", function(e) {
    if (e.target.tagName === "INPUT" && e.target.type === "text" && e.key === "Enter"){
        updateTodo();
    }
});

document.addEventListener("click", updateTodo);

addButton.addEventListener("click", function(e) {
    e.stopPropagation();
    createTodo();
});

addInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        createTodo();
    }
});