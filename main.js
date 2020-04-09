const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
//const equals = document.querySelector('[data-equals');
const clear = document.querySelector('[data-clear]');
const clearAll = document.querySelector('[data-clear-all]');
let display = document.querySelector('.calculator-container__display');
const maximumDigits = 10;

let previousNumber, currentNumber;
let previousOperator ,currentOperator;
let equalPressed = false;

const appendNumbers = number => {
    //When the calculator is starting up
    if(currentNumber === undefined) {
        //When the decimal point is clicked first
        if(display.textContent === '0' && number === '.') {
            currentNumber = '0.';
            return;
        }
        //When a number is clicked first
        currentNumber = number;
        return;
    }
    //When a number in currentNumber exists
    currentNumber += number;
}

const placeNumbers = number => {
    let numDigit = number.textContent;
    if(display.textContent.length >= maximumDigits) return;  //When the calculator reaches its maximum digit display
    if(numDigit === '.' && display.textContent.includes('.')) return; //Avoiding placing of two or more decimal places
    appendNumbers(numDigit);
}

const clearDigit = () => {
    if(currentNumber === undefined) return;
    
    currentNumber = currentNumber.toString().slice(0, -1);
    if(currentNumber === '') {
        currentNumber = undefined;
        display.textContent = '0';
    }
}

const clearAllDigits = () => {
    previousNumber = undefined;
    currentNumber = undefined;
    previousSign = undefined;
    display.textContent = '0';
}

const chooseOperation = operationSign => {
    if(currentNumber === undefined) return;
    if(previousNumber === undefined) {
        previousOperator = operationSign;
        previousNumber = currentNumber;
        currentNumber = undefined;
        return;
    } 
    else {
        currentOperator = operationSign;
        calculation();
        return;
    }
}

const calculation = () => {
    let calculatedValue;

    switch(previousOperator || currentOperator) {
        case '+':
            calculatedValue = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            calculatedValue = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '×':
            calculatedValue = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '÷':
            calculatedValue = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            return;
    }
    previousOperator = currentOperator;
    previousNumber = calculatedValue;
    currentNumber = calculatedValue;
    updateDisplay();
    currentNumber = undefined;
}

const updateDisplay = () => {
    if(display.textContent.length >= maximumDigits) return;
    if(currentNumber === undefined) return;
    display.textContent = currentNumber.toString(); //Displays the current number into the calculator
}

//Entering of numbers
numbers.forEach(numBtn => {
    numBtn.addEventListener('click', e => {
        placeNumbers(numBtn);
        updateDisplay();
    });
});

//Clearing of a digit
clear.addEventListener('click', e => {
    clearDigit();
    updateDisplay();
});

//Clearing all of digit
clearAll.addEventListener('click', e => {
    clearAllDigits();
    updateDisplay();
})

operations.forEach(operationBtn => {
    operationBtn.addEventListener('click', e => {
        chooseOperation(operationBtn.textContent);
    });
});

/*equals.addEventListener('click', e => {
    equalPressed = true;
    calculation();
});*/