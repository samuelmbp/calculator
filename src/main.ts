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
    const button = event.target as HTMLElement;
    if (!button.closest("button")) return;

    const { buttonType } = button.dataset;
    const displayValue = calculatorDisplay.textContent ?? undefined;

    // Release operator pressed state
    const operatorButtons = [calculatorButtons.children].filter((button) => {
        if (!(button instanceof HTMLElement)) return false;
        button.dataset.buttonType === "operator";
    });

    operatorButtons.forEach((button) => {
        if (!(button instanceof HTMLElement)) return false;
        button.classList.remove("is-pressed");
    });

    if (buttonType !== "clear") {
        const clearButton = calculator.querySelector(".clear");
        if (!clearButton) return;
        clearButton.textContent = "CE";
    }

    switch (buttonType) {
        case "clear": handleClearButton(calculator, button);break
        case "number": handleNumberButtons(calculator, button, calculatorDisplay);break
        case "decimal": handleDecimalButton(calculatorDisplay);break
        case "operator": handleOperatorButton(calculator, button, displayValue);break
        case "equal":handleEqual(calculator, displayValue, calculatorDisplay);break
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

const handleClearButton = (calculator: HTMLDivElement, button: HTMLElement) => {
    calculatorDisplay.textContent = "0";
    button.textContent = "AC";
    // Deletes data attributes.
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
};

const handleNumberButtons = (
    calculator: HTMLDivElement,
    button: HTMLElement,
    display: HTMLDivElement
) => {
    const { previousButtonType } = calculator.dataset;
    const { key } = button.dataset;
    const displayValue = display.textContent ?? "";

    if (displayValue === "0" && key) display.textContent = key;
    else display.textContent = displayValue + key;

    if (previousButtonType === "operator" && key) display.textContent = key;
};

const handleDecimalButton = (display: HTMLDivElement) => {
    const displayValue = display.textContent ?? "";

    if (displayValue !== undefined && !displayValue.includes(".")) {
        display.textContent = displayValue + ".";
    }
};

const handleOperatorButton = (
    calculator: HTMLDivElement,
    button: HTMLElement,
    displayValue: string | undefined
) => {
    button.classList.add("is-pressed");
    calculator.dataset.firstValue = displayValue;
    calculator.dataset.operator = button.dataset.key;
};

const handleEqual = (
    calculator: HTMLDivElement,
    displayValue: string | undefined,
    display: HTMLDivElement
) => {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayValue;

    if (firstValue && operator && secondValue) {
        const result = calculate(firstValue, operator, secondValue);
        display.textContent = result.toString();
    }
};
