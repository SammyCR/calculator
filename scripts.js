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

function displayString(value){ // A function that will display a string on the calculator's display
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

function newPage(){ //newPage bool is used to see if the screen was recently cleared or created
    if(newPageBool == true){
        clear();
        newPageBool = false;
    }
}

function backspace(){ // A function that removes the last entered value (backspace)
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
let backButton = document.querySelector("#backspace"); // Backspace button event listener
backButton.addEventListener('click', () => {
    backspace();
})

function numberEvent(value){ // A function called when a number button or key is pressed that makes sure too many numbers aren't being entered
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

function addDecimal(){ // A function to add a decimal to the display
    addDisplay(".");
    point.disabled = true; // Disable the decimal button once it is pressed (only one decimal per number)
}

function decimalEvent(){ // A function to add a decimal (and maybe a leading zero) on event trigger
    newPage();
    let screen = document.querySelector("#screenP");
    if(screen.textContent == "" || afterOp){
        clear();
        addDisplay(0);
    }
    addDecimal();
    afterOp = false;
}

let point = document.querySelector("#pointButton");
point.addEventListener('click', () => {
    decimalEvent();
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
    while(i < listOfOp.length){ // Search through operations list for multiplication and division
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
    while(i < listOfOp.length){ // Search through operations for addition and subtraction
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
    return zeroDiv ? "zeroDiv" : listOfOp[0]; // Return zeroDiv if there was an attempted zero division
}

function equalsEvent(){ // A function for calculating the result when equals is pressed
    newPage();
    let screen = document.querySelector("#screenP");
    if(screen.innerHTML == ""){ // Prevent against error when equals button is pressed but there have been no previous operations
        displayString("");
        return;
    }
    
    if(afterOp){ //If you press equals just after pressing an operator, remove the operator from the list
        listVal.pop();
    }
    else{ //Otherwise, add the display value to the operation and value list to be calculated later
        listVal.push(parseFloat(displayVal));
    }
    if(isNaN(listVal[0])){ //if an operation was entered first before a number
        listVal[0] = 0;
    }
    if(orderOfOp(listVal) == "zeroDiv"){
        displayString("Zero Div");
    }
    else{
        display(orderOfOp(listVal)); // Display the result

    }
    listVal = []; // Clear the operation list
    afterOp = true;
}

function opEvent(op){ // A function to add operator to operation list
    newPage();
    listVal.push(parseFloat(document.querySelector('#screenP').innerHTML));
    listVal.push(op);
    afterOp = true;
}

document.addEventListener('keydown', (e) => { // Event listener for keypress. Adds keyboard support to the calculator
    newPage(); // Check if screen should be cleared if it is recently created
    for(let i = 0; i < 10; i++){ // Add number key event listeners
        if(e.key == i) numberEvent(i)
    }
    if(e.code == "Backspace") backspace()
    else if(e.code == "Escape") clear()
    else if(e.code == "Period") decimalEvent()
    else if(e.keyCode == "13"){ // Equals key event listener
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