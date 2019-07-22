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

function display(value){
    let screen = document.querySelector('#screenP');
    let displayValue = parseFloat(value);
    screen.textContent = displayValue;
}

let displayVal
function addDisplay(value){ //a function that adds the value parameter to the current display value
    let screen = document.querySelector('#screenP');
    currentValue = screen.innerHTML;
    let valToDisplay = currentValue + value;
    display(valToDisplay);
    displayVal = currentValue + value;
    console.log(displayVal)
}
function clear(){ // A function that clears the display
    let screen = document.querySelector("#screenP");
    screen.textContent = "";
}

let afterOp = false; // A boolean variable to tell if an operation was just performed. Used for determining if the display should be cleared for the next input number

let numButtons = document.querySelectorAll('.number');
numButtons.forEach((button) => {
    let value = button.innerHTML;
    button.addEventListener('click', () => {
        if(afterOp){
            clear()
            afterOp = false;
        }
        addDisplay(value);
    });
});

let clearButton = document.querySelector('#CEButton');
clearButton.addEventListener('click', () => {
    clear()
    count = 0;
});

let operators = document.querySelectorAll(".opF");
let val = []; //A variable for the first value
let count = 0; //A counter for val storage list
let opValue; // A variable to store the operation that is going to be performed
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        val[count] = document.querySelector('#screenP').innerHTML;
        count++;
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
        afterOp = true;
    })
})

let equals = document.querySelector("#equalsButton")
equals.addEventListener('click', () => {
    let screen = document.querySelector("#screenP");
    console.log(opValue);
    console.log(parseFloat(val[0]));
    console.log(parseFloat(displayVal))
    display(operate(opValue, parseFloat(val[0]), parseFloat(displayVal)));
    afterOp = true;
    count = 0;
})