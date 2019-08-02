function add(a, b){
    return a + b
}
function subtract(a, b){
    return a - b
}
function multiply(a, b){
    return a * b
}
function divide(a, b){
    return a / b
}

function operate(operator, a, b){ //A function that takes in an operator name and two numbers and performs that operation
    if(operator == "add"){
        return add(a, b)
    }
    else if(operator == "subtract"){
        return subtract(a, b)
    }
    else if(operator == "multiply"){
        return multiply(a, b)
    }
    else if(operator == "divide"){
        return divide(a, b)
    }
}

let listVal = []; //A list to store all operations and variables

function display(value, point){
    let screen = document.querySelector('#screenP');
    let displayValue = parseFloat(value);
    if(point){ // If there is a decimal point, add a decimal
        displayValue += "."
    }
    if(String(displayValue).length > 10){
        let sciDisplay = displayValue.toPrecision(5);
        screen.textContent = sciDisplay;
    }
    else{
        screen.textContent = displayValue;
    }
}

function displayString(value){
    let screen = document.querySelector('#screenP');
    screen.textContent = value;
}

let displayVal;
function addDisplay(value){ //a function that adds the value parameter to the current display value
    let pointQ = false; // A boolean to store if there is a decimal point
    let screen = document.querySelector('#screenP');
    currentValue = screen.innerHTML;
    let valToDisplay = currentValue + value;
    if(value == "."){ // If there is a decimal point, set pointQ to true
        pointQ = true;
    }
    display(valToDisplay, pointQ);
    displayVal = currentValue + value;
    //console.log(displayVal)
}

function clear(){ // A function that clears the display
    console.log("Clear")
    let screen = document.querySelector("#screenP");
    screen.textContent = "";
    document.querySelector("#pointButton").disabled = false; // Enable the decimal button
    let listVal = [];
    let displayVal = "";
}

let newPageBool = true;

function newPage(){
    if(newPageBool == true){
        clear();
        newPageBool = false;
    }
}

function backspace(){
    newPage();
    let point = false;
    if(String(displayVal)[displayVal.length - 2] == "."){
        point = true;
    }
    if(String(displayVal).length == 1){
        //display(0);
        displayString("");
    }
    else{
        displayVal = displayVal.slice(0, -1);
        display(displayVal, point);
        console.log(displayVal);
    }
}
let backButton = document.querySelector("#backspace");
backButton.addEventListener('click', () => {
    backspace();
})

function numberEvent(value){
    newPage();
    if(afterOp){
        clear()
    }
    if(!(String(displayVal).length >= 10 && afterOp == false)){ // If there are at least 10 values on the screen, don't allow more to be entered
        addDisplay(value)
    }
    if(afterOp){
        afterOp = false;
    }
}

let afterOp = false; // A boolean variable to tell if an operation was just performed. Used for determining if the display should be cleared for the next input number

let numButtons = document.querySelectorAll('.number');
numButtons.forEach((button) => {
    let value = button.innerHTML;
    button.addEventListener('click', () => {
        numberEvent(value);
    });
});

function addDecimal(){
    addDisplay(".");
    point.disabled = true; // Disable the decimal button once it is pressed (only one decimal per number)
}
let point = document.querySelector("#pointButton");
point.addEventListener('click', () => {
    newPage();
    addDisplay(0);
    addDecimal();
});

let clearButton = document.querySelector('#CEButton');
clearButton.addEventListener('click', () => {
    clear();
});

let operators = document.querySelectorAll(".opF");

let opValue; // A variable to store the operation that is going to be performed
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        listVal.push(parseFloat(document.querySelector('#screenP').innerHTML));
        opValue = operator.innerHTML;
        if(opValue == "÷"){
            opValue="divide";
        }
        else if(opValue=="×"){
            opValue = "multiply";
        }
        else if(opValue== "-"){
            opValue = "subtract";
        }
        else if(opValue== "+"){
            opValue = "add";
        }
        listVal.push(opValue);
        afterOp = true;
    })
})

function orderOfOp(listOfOp){ //A function that given a list of operations returns the answer using the right order of operations
    let i = 1;
    console.log(listOfOp);
    let zeroDiv = false;
    while(i < listOfOp.length){
        if(listOfOp[i] == "multiply"){
            listOfOp[i-1] = listOfOp[i-1] * listOfOp[i+1];
            listOfOp.splice(i, 2);
            i = 1;
        }
        else if(listOfOp[i] == "divide"){
            if(listOfOp[i+1] == 0){
                zeroDiv = true;
                console.log("orderOfOp zero division");
                break;
            }
            listOfOp[i-1] = listOfOp[i-1] / listOfOp[i+1];
            listOfOp.splice(i, 2);
            i = 1;
        }
        else{
            i++;
        }
        console.log(listOfOp);
        console.log(i);
    }
    i = 1;
    while(i < listOfOp.length){
        if(zeroDiv == true){
            break;
        }
        if(listOfOp[i] == "add"){
            listOfOp[i-1] = listOfOp[i-1] + listOfOp[i+1];
            listOfOp.splice(i, 2);
            i = 1;
        }
        else if(listOfOp[i] == "subtract"){
            listOfOp[i-1] = listOfOp[i-1] - listOfOp[i+1];
            listOfOp.splice(i, 2);
            i = 1;
        }
        else{
            i++;
        }
        console.log(listOfOp);
        console.log(i);
    }
    return zeroDiv ? "zeroDiv" : listOfOp[0];
}

function equalsEvent(){
    let screen = document.querySelector("#screenP");
    if(screen.innerHTML == ""){
        displayString("");
        return;
    }
    
    if(afterOp){ //If you press equals just after pressing an operator, remove the operator from the list
        listVal.pop();
    }
    else{ //Otherwise, add the display value to the operation and value list to be calculated later
        listVal.push(parseFloat(displayVal));
    }

    if(orderOfOp(listVal) == "zeroDiv"){
        displayString("Zero Div");
    }
    else{
        display(orderOfOp(listVal));

    }
    listVal = [];
    afterOp = true;
}

function opEvent(op){
    newPage();
    listVal.push(parseFloat(document.querySelector('#screenP').innerHTML));
    listVal.push(op);
    afterOp = true;
}

document.addEventListener('keydown', (e) => {
    newPage();
    for(let i = 0; i < 10; i++){
        if(e.key == i) numberEvent(i)
    }
    if(e.code == "Backspace") backspace()
    else if(e.code == "Escape") clear()
    else if(e.code == "Period") addDecimal()
    else if(e.keyCode == "13"){
        e.preventDefault();
        equalsEvent();
    }
    else if(e.code == "Slash") opEvent("divide")
    else if(e.key == "*") opEvent("multiply")
    else if(e.code == "Minus") opEvent("subtract")
    else if(e.key == "+") opEvent("add")
});

let equals = document.querySelector("#equalsButton");
equals.addEventListener('click', () => { // Evaluates expression and displays it when equals button is clicked
    equalsEvent();
});