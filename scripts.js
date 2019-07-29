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
    screen.textContent = displayValue;
    console.log(displayValue);
    console.log(typeof(displayValue))

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
    let screen = document.querySelector("#screenP");
    screen.textContent = "";
    document.querySelector("#pointButton").disabled = false; // Enable the decimal button
    let listVal = [];
    let displayVal = "";
}

function backspace(){
    let point = false;
    if(String(displayVal)[displayVal.length - 2] == "."){
        point = true;
    }
    if(String(displayVal).length == 1){
        display(0);
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

let point = document.querySelector("#pointButton");
point.addEventListener('click', () => {
    addDisplay(".");
    point.disabled = true; // Disable the decimal button once it is pressed (only one decimal per number)
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

let equals = document.querySelector("#equalsButton");
equals.addEventListener('click', () => { // Evaluates expression and displays it when equals button is clicked
    let screen = document.querySelector("#screenP");
    //console.log(opValue);
    //console.log(parseFloat(listVal[0]));
    //console.log(parseFloat(displayVal));
    listVal.push(parseFloat(displayVal));
    //display(operate(opValue, parseFloat(listVal[0]), parseFloat(displayVal)));
    //console.log(listVal);
    if(orderOfOp(listVal) == "zeroDiv"){
        displayString("Zero Div");
    }
    else{
        display(orderOfOp(listVal));
        console.log(`From function: ${orderOfOp(listVal)}`);
    }
    listVal = [];
    afterOp = true;
});