import "./style.scss";

const calculatorDisplay = document.querySelector<HTMLInputElement>(
    ".calculator__display"
);
const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".calculator__button"
);

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

        if (!isNaN(parseFloat(buttonValue)) || buttonValue === ".") {
            calculatorDisplay.value += buttonValue;
        } else if (buttonValue === "C") {
            calculatorDisplay.value = "";
            firstOperand = "";
            secondOperand = "";
            operator = "";
        } else {
            if (firstOperand === "") {
                firstOperand = calculatorDisplay.value;
                operator = buttonValue;
                calculatorDisplay.value = "";
            } else if (secondOperand === "") {
                // Update the operator to the most recently clicked one
                operator = buttonValue;
            }
        }
    });
});
