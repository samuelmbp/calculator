import "./style.scss";

const calculatorDisplay = document.querySelector<HTMLInputElement>(
    ".calculator__display"
);
const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".calculator__button"
);

// TODO: Add these variables inside event listener (use params for the functions)
let firstOperand: string = "";
let secondOperand: string = "";
let operator: string = "";

if (!buttons || !calculatorDisplay) {
    throw new Error("Error while pressing a button.");
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue: string | null = button.textContent;

        if (!buttonValue) return;

        if (isValidNumber(buttonValue) || buttonValue === ".") {
            calculatorDisplay.value += buttonValue;
        } else if (buttonValue === "C") {
            clearDisplay();
        } else if (buttonValue === "=") {
            calculate(firstOperand, secondOperand);
        } else {
            handleOperator(buttonValue);
        }
    });
});

const isValidNumber = (value: string): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};

const handleOperator = (operatorSymbol: string): void => {
    if (firstOperand === "") {
        firstOperand = calculatorDisplay.value;
        operator = operatorSymbol;
        calculatorDisplay.value = "";
    } else if (secondOperand === "") {
        // Update the operator to the most recently clicked one
        operator = operatorSymbol;
    }
};

const clearDisplay = (): void => {
    calculatorDisplay.value = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
};

const calculate = (firstOperand: string, secondOperand: string) => {
    secondOperand = calculatorDisplay.value;
    let result: number = 0;

    switch (operator) {
        case "+":
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case "-":
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case "×":
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        // TODO: Show the result with only 4-6 digits?
        case "÷":
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        case "%":
            result = parseFloat(firstOperand) % parseFloat(secondOperand);
            break;
        default:
            break;
    }

    calculatorDisplay.value = result.toString();

    // Reset operands and operator
    firstOperand = "";
    secondOperand = "";
    operator = "";
};
