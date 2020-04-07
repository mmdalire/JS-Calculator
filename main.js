//Number array
const numbers = [
    document.getElementById('_0'),
    document.getElementById('_1'),
    document.getElementById('_2'),
    document.getElementById('_3'),
    document.getElementById('_4'),
    document.getElementById('_5'),
    document.getElementById('_6'),
    document.getElementById('_7'),
    document.getElementById('_8'),
    document.getElementById('_9')
];

//Operations
const add = document.getElementById('add');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const percent = document.getElementById('percent');
const positiveNegative = document.getElementById('positive-negative');
const decimal = document.getElementById('decimal');
const clearAll = document.getElementById('ac');
let displayCalculator = document.getElementById('display-text');

const maxNumberDigit = 10; //Maximum digits in calculator to be placed
let totalCounter = 0; //Total counter for number manipulation
let operation; //Check what operation is currently performing
let repeatOperation = false;
let isFirstNumber = true;
let doneOperation = false;

//Functions
//Enter numbers (mouse)
const enterMouseNumbers = (numericKeypad, number) => {
    numericKeypad[number].addEventListener('click', e => {
        //Executes if the operation is done performing to clear the screen to enter another number
        if(doneOperation === true) {
            displayCalculator.textContent = '0';
            doneOperation = false;
        }
        
        if(isFirstNumber === false) {
            displayCalculator.textContent = '0';
            isFirstNumber = true;
        }

        //Replace number if the screen displays ONLY 0
        if(displayCalculator.textContent === '0') {
            displayCalculator.textContent = number;
        }
        else {
            if(displayCalculator.textContent.length < maxNumberDigit) {
                displayCalculator.textContent += number;
            } 
        }
    });
}

//Clear a number 
const clearNumbers = e => {
    if(e.key === 'Backspace') {
        //Clears the last number placed
        if(displayCalculator.textContent.length > 1) {
            let removedNumberDisplay = displayCalculator.textContent.substring(0, displayCalculator.textContent.length - 1);
            displayCalculator.textContent = removedNumberDisplay;
        }
        //Replaces 0 if no numbers to clear
        else {
            displayCalculator.textContent = 0;
        }
    }
}

//Add a number
const addNumbers = () => {
    //Avoid placing the same operation twice
    if(doneOperation === true) {
        return;
    }

    //First input of number
    if(isFirstNumber === true) {
        operation = '+';
        isFirstNumber = false;
        totalCounter += parseInt(displayCalculator.textContent);
        displayCalculator.textContent = totalCounter;
    }
    else {
        totalCounter += parseInt(displayCalculator.textContent);
        displayCalculator.textContent = totalCounter;
        doneOperation = true;
    }
}

//Clear all numbers
const clearAllNumbers = () => {
    //Reset everything
    displayCalculator.textContent = 0;
    totalCounter = 0;
    operation = undefined;
    isFirstNumber = true;
}

//Event listeners
//Place numbers in display
for(let i = 0; i < numbers.length; i++) {
    enterMouseNumbers(numbers, i);
}

//Clear a number in display
window.addEventListener('keydown', e => {
    clearNumbers(e);
})

//Clear all numbers in dislay 
clearAll.addEventListener('click', e => {
    clearAllNumbers();
});

//Add numbers
add.addEventListener('click', e => {
    addNumbers();
});
