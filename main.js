const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const clear = document.querySelector('[data-clear]');
const clearAll = document.querySelector('[data-clear-all]');
let display = document.querySelector('.calculator-container__display');
const maximumDigits = 10;

let previousNumber, currentNumber;
let previousSign;

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
        currentNumber = parseFloat(currentNumber);
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

const calculation = operationSign => {
    let calculated;
    operationSign = operationSign.textContent;
    currentNumber = parseFloat(currentNumber);

    if(operationSign === '=' && previousNumber === undefined) return;
    if(previousNumber === undefined) {
        previousNumber = currentNumber;
        currentNumber = undefined;
        previousSign = operationSign;
        return;
    }
    if(previousNumber !== undefined && currentNumber !== undefined && operationSign === '=') {
        switch(previousSign) {
            case '+':
                calculated = previousNumber + currentNumber;
                break;
            case '-':
                calculated = previousNumber - currentNumber;
                break;
            case '×':
                calculated = previousNumber * currentNumber;
                break;
            case '÷':
                calculated = previousNumber / currentNumber;
                break;
            default:
                return;
        }
        currentNumber = calculated;
        updateDisplay();
        currentNumber = undefined;
    }

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
        calculation(operationBtn);
    });
});