import "./style.scss";

const calculatorDisplay = document.querySelector<HTMLInputElement>(
    ".calculator__display"
);
const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".calculator__button"
);

if (!buttons || !calculatorDisplay) {
    throw new Error("Error while pressing a button.");
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue: string | null = button.textContent;

        if (!buttonValue) return;

        // Check the type of button clicked (number, operator, clear, equal) and handle the action accordingly
        if (!isNaN(parseFloat(buttonValue)) || buttonValue === ".") {
            // Update the display with the appropriate value or result
            calculatorDisplay.value += buttonValue;
        }
    });
});
