//input taken from the input element
let todoInput = document.getElementById("todoInput");
todoInput.addEventListener("keyup", function(event) {
    if(event.keyCode===13) {
        todoAdd();
    }
});

//unordered list
let todoList = document.getElementById("todoList");

//function to add new tasks to the list
function todoAdd() {
    if(todoInput.value==="") {
        return;
    }
    todoList.append(createList(todoInput.value));
    todoInput.value = "";
}

//function to remove all the tasks
function todoRemoveAll() {
    while(todoList.childElementCount!=0) {
        todoList.removeChild(todoList.firstChild);
    }
}

//function to check task 
function todoCheck(event) {
    let currentElement = getCurrentElement(event);
    let textElement = currentElement.parentElement.parentElement.children[0].children[1];
    let listElement = currentElement.parentElement.parentElement;
    if(textElement.classList.contains("line-through")) {
        textElement.classList.remove("line-through");
        textElement.classList.remove("decoration-4");
        listElement.removeChild(listElement.lastChild);
        listElement.append(createChildButtonParent(true));
    }
    else {
        textElement.classList.add("line-through");
        textElement.classList.add("decoration-4");
        listElement.removeChild(listElement.lastChild);
        listElement.append(createChildButtonParent(false));
    }
}

//function to remove task
function todoRemove(event) {
    let currentElement = getCurrentElement(event);
    let listElement = currentElement.parentElement.parentElement;
    listElement.parentElement.removeChild(listElement);
}

//function to update an existing item
function todoUpdate(event) {
    let parentContainer = event.target.parentElement;
    let input = createInput();
    input.value = parentContainer.children[1].innerHTML.trim();
    parentContainer.children[1].classList.add("hidden");
    parentContainer.append(input);
    parentContainer.children[2].focus();
    input.addEventListener("focusout", function(event) {
        removeInput(parentContainer, input);
    });
    input.addEventListener("keyup", function(event) {
        if(event.keyCode===13) {
            removeInput(parentContainer, input);
        }
    });
}

//function for replacing the updated value and removing the input element
function removeInput(parentContainer, input) {
    parentContainer.children[1].innerHTML = input.value;
    parentContainer.children[1].classList.remove("hidden");
    parentContainer.removeChild(parentContainer.children[2]);
}

//function to get current element
function getCurrentElement(event) {
    let currentElement;
    if(event.target.id==="button") {
        currentElement = event.target;
    }
    else if(event.target.id==="svg") {
        currentElement = event.target.parentElement;
    }
    else {
        currentElement = event.target.parentElement.parentElement;
    }
    return currentElement;
}

//function to create the list element
function createList(task) {
    //parent list element
    let li = document.createElement("li");
    li.classList.add("grid");
    li.classList.add("grid-cols-3");
    li.classList.add("gap-2");
    li.classList.add("my-4");

    //child text parent element 
    let divTaskParent = createChildTextParent(task);

    //button parent element
    let divButtonParent = createChildButtonParent(true);

    li.append(divTaskParent);
    li.append(divButtonParent);
    return li;
}

//function to create disc element
function createDisc() {
    let divDisc = document.createElement("div");
    divDisc.classList.add("w-3");
    divDisc.classList.add("h-3");
    divDisc.classList.add("rounded-full");
    divDisc.classList.add("my-auto");
    divDisc.classList.add("bg-customBlue");
    return divDisc;
}

//child text parent element 
function createChildTextParent(task) {
    let divTaskParent = document.createElement("div");
    divTaskParent.classList.add("col-span-2");
    divTaskParent.classList.add("grid");
    divTaskParent.classList.add("grid-cols-6");
    divTaskParent.classList.add("items-center");

    let divDisc = createDisc();
    
    let divTask = document.createElement("div");
    divTask.classList.add("col-span-5");
    divTask.classList.add("break-words");
    divTask.setAttribute("onclick", "todoUpdate(event)");
    divTask.innerHTML = task;

    divTaskParent.append(divDisc);
    divTaskParent.append(divTask);
    return divTaskParent;
}

//button parent element
function createChildButtonParent(flag) {

    //true -> check
    //false -> uncheck

    let div = document.createElement("div");
    div.classList.add("col-span-1");
    div.classList.add("flex");
    div.classList.add("self-start");
    div.classList.add("justify-between");
    div.classList.add("xs:justify-evenly");
    div.classList.add("my-auto");

    let removeBtn = createRemoveButton();

    if(flag) {
        let checkBtn = createCheckButton();
        div.append(checkBtn);
    }
    else {
        let uncheckBtn = createUncheckButton();
        div.append(uncheckBtn);
    }
    div.append(removeBtn);
    return div;
}

//function to create the check button
function createCheckButton() {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.setAttribute("onclick", "todoCheck(event)");
    button.setAttribute("id", "button");
    
    let svg = createSVG();

    let path = createPath("M5 13l4 4L19 7");

    svg.append(path);
    button.append(svg);
    return button;
}

//function to create the uncheck button
function createUncheckButton() {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.setAttribute("id", "button");
    button.setAttribute("onclick", "todoCheck(event)");
    
    let svg = createSVG();

    let path = createPath("M6 18L18 6M6 6l12 12");

    svg.append(path);
    button.append(svg);
    return button;
}

//function to create the remove button
function createRemoveButton() {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("bg-customRed");
    button.setAttribute("onclick", "todoRemove(event)");
    button.setAttribute("id", "button");
    
    let svg = createSVG();

    let path = createPath("M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636");

    svg.append(path);
    button.append(svg);
    return button;
}

//function to create svg element 
function createSVG() {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("stroke", "currentColor");   
    svg.classList.add("h-6");
    svg.classList.add("w-6");
    svg.setAttribute("id", "svg");
    return svg;
}

//function to create path element
function createPath(event) {
    let path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", event);
    path.setAttribute("id", "path");
    return path;
}

//function to create an input element for update
function createInput() {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("rounded-md");
    input.classList.add("bg-customYellow");
    input.classList.add("focus:outline");
    input.classList.add("focus:outline-customYellow");
    input.classList.add("focus:ring");
    input.classList.add("focus:ring-customYellow");
    input.classList.add("w-full");
    input.classList.add("col-span-5");
    return input;
}