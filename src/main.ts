import "./style.scss";

// Event delegation pattern to listen to every key.
const calculator = document.querySelector<HTMLDivElement>(".calculator");

if (!calculator) throw new Error("Error while accessing the calculator...");

const calculatorDisplay = calculator.querySelector<HTMLDivElement>(
    ".calculator__display"
);
const calculatorButtons = calculator.querySelector<HTMLDivElement>(
    ".calculator__buttons"
);

if (!calculatorButtons || !calculatorDisplay)
    throw new Error("Error while trying to press on the buttons..");

calculatorButtons.addEventListener("click", (event: Event) => {
    // Returns closest ancestor of the current element or the element itself
    const target = event.target as Element;
    if (!target.closest("button")) return;

    const button = event.target as HTMLElement;
    const buttonType: string | undefined = button.dataset.buttonType;
    const key: string | undefined = button.dataset.key;
    const previousButtonType = calculator.dataset.previousButtonType;
    const displayValue = calculatorDisplay.textContent ?? undefined;

    // Release operator pressed state
    const operatorButtons = [calculatorButtons.children].filter((button) => {
        // Ensures it is HTMLElement
        if (!(button instanceof HTMLElement)) return false;
        button.dataset.buttonType === "operator";
    });

    operatorButtons.forEach((button) => {
        if (!(button instanceof HTMLElement)) return false;
        button.classList.remove("is-pressed");
    });

    if (buttonType === "number" && key) {
        if (displayValue === "0") {
            calculatorDisplay.textContent = key;
        } else {
            calculatorDisplay.textContent = displayValue + key;
        }

        // When previous action is an operator, show the clicked number.
        if (previousButtonType === "operator") {
            calculatorDisplay.textContent = key;
        }
    }

    if (buttonType === "decimal") {
        if (displayValue !== undefined && !displayValue.includes(".")) {
            calculatorDisplay.textContent = displayValue + ".";
        }
    }

    if (buttonType === "operator") {
        button.classList.add("is-pressed");
        calculator.dataset.firstValue = displayValue;
        calculator.dataset.operator = button.dataset.key;
    }

    if (buttonType === "equal") {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayValue;

        if (firstValue && operator && secondValue) {
            const result = calculate(firstValue, operator, secondValue);
            calculatorDisplay.textContent = result.toString();
        }
    }

    if (buttonType === "clear") {
        calculatorDisplay.textContent = "0";
        button.textContent = "AC";
        if (button.textContent === "AC") {
            // Remove any values saved on calculator
            delete calculator.dataset.firstValue;
            delete calculator.dataset.operator;
        }
    }

    if (buttonType !== "clear") {
        const clearButton = calculator.querySelector(".clear");
        if (!clearButton) return;

        clearButton.textContent = "CE";
    }

    calculator.dataset.previousButtonType = buttonType;
});

const calculate = (
    firstValue: string,
    operator: string,
    secondValue: string
) => {
    if (operator === "plus")
        return parseFloat(firstValue) + parseFloat(secondValue);
    if (operator === "minus")
        return parseFloat(firstValue) - parseFloat(secondValue);
    if (operator === "times")
        return parseFloat(firstValue) * parseFloat(secondValue);
    if (operator === "divide")
        return parseFloat(firstValue) / parseFloat(secondValue);
    if (operator === "modulo")
        return parseFloat(firstValue) % parseFloat(secondValue);

    throw new Error("Invalid operator");
};
