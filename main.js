const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals');
const positiveNegative = document.querySelector('[data-positive-negative');
const clear = document.querySelector('[data-clear]');
const clearAll = document.querySelector('[data-clear-all]');
let display = document.querySelector('.calculator-container__display');
const maximumDigits = 10;

let previousNumber, currentNumber;
let previousOperator ,currentOperator;

const appendNumbers = number => {
    //When the calculator is starting up
    if(currentNumber === undefined) {
        //When the decimal point is clicked first
        if(display.textContent === '0' && number === '.') {
            currentNumber = '0.';
            return;
        }
        //When initially the number is 0 and the user clicks 0 again
        if(display.textContent === '0' && number === '0') return;
        //When a number is clicked first
        currentNumber = number;
        return;
    }
    //When a number in currentNumber exists
    currentNumber += number
}

const placeNumbers = number => {
    let numDigit = number.textContent;
    if(display.textContent.length > maximumDigits) return;  //When the calculator reaches its maximum digit display
    if(numDigit === '.' && display.textContent.includes('.')) return; //Avoiding placing of two or more decimal places
    appendNumbers(numDigit);
}

const clearDigit = () => {
    if(currentNumber === undefined) return;
    currentNumber = currentNumber.toString().slice(0, -1); //Remove the last digit
    //If it reaches an empty string, clears out the display
    if(currentNumber === '') {
        currentNumber = undefined;
        display.textContent = '0';
    }
}

const clearAllDigits = () => {
    previousNumber = undefined;
    currentNumber = undefined;
    previousOperator = undefined;
    currentOperator = undefined;
    display.textContent = '0';
}

const changeSign = () => {
    if(currentNumber !== undefined) {
        currentNumber *= -1;
    }
    return;
}

const chooseOperation = operationSign => {
    if(currentNumber === undefined) return;
    if(previousNumber === undefined) {
        previousOperator = operationSign;
        previousNumber = currentNumber;
        currentNumber = undefined;
        return;
    } 
    currentOperator = operationSign;
    calculation();
    return;
}

const calculation = () => {
    let calculatedValue;

    switch(previousOperator) {
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

    //When the equal button is pressed, it shows the final value and resets the display
    if(currentOperator === '=') {
        currentNumber = calculatedValue;
        updateDisplay();
        previousNumber = undefined;
        currentNumber = undefined;
        previousOperator = undefined;
        currentOperator = undefined;
        return;
    }

    previousOperator = currentOperator;
    previousNumber = calculatedValue;
    currentNumber = calculatedValue;
    updateDisplay();
    currentNumber = undefined;
}

const updateDisplay = () => {
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
});

//Change the sign from positive to negative and vice versa
positiveNegative.addEventListener('click', e => {
    changeSign();
    updateDisplay();
});

//Choosing operations
operations.forEach(operationBtn => {
    operationBtn.addEventListener('click', e => {
        chooseOperation(operationBtn.textContent);
    });
});

//Equals is pressed
equals.addEventListener('click', e => {
    currentOperator = equals.textContent;
    calculation();
});