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
    const target = event.target as HTMLElement;
    if (!target.closest("button")) return;

    const buttonType = target.dataset.buttonType;
    const key = target.dataset.key;
    const previousButtonType = calculator.dataset.previousButtonType;
    const displayValue = calculatorDisplay.textContent ?? undefined;

    const operatorButtons = [calculatorButtons.children].filter((button) => {
        // Ensures it is a HTMLElement
        if (!(button instanceof HTMLElement)) return false;
        button.dataset.buttonType === "operator";
    });

    // Release operator pressed state
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
        target.classList.add("is-pressed");
        calculator.dataset.firstValue = displayValue;
        calculator.dataset.operator = target.dataset.key;
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
        target.textContent = "AC";
        if (target.textContent === "AC") {
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
