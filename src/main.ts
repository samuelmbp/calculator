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
    const result = calculatorDisplay.textContent ?? undefined;

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
        if (result === "0") {
            calculatorDisplay.textContent = key;
        } else {
            calculatorDisplay.textContent = result + key;
        }

        // When previous action is an operator, show the clicked number.
        if (previousButtonType === "operator") {
            calculatorDisplay.textContent = key;
        }
    }

    if (buttonType === "decimal") {
        calculatorDisplay.textContent = result + ".";
    }

    if (buttonType === "operator") {
        button.classList.add("is-pressed");
        calculator.dataset.firstValue = result;
        calculator.dataset.operator = button.dataset.key;
    }

    if (buttonType === "equal") {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = result;

        if (!firstValue || !secondValue) return;

        let newResult = 0;
        if (operator === "plus")
            newResult = parseFloat(firstValue) + parseFloat(secondValue);
        if (operator === "minus")
            newResult = parseFloat(firstValue) - parseFloat(secondValue);
        if (operator === "times")
            newResult = parseFloat(firstValue) * parseFloat(secondValue);
        if (operator === "divide")
            newResult = parseFloat(firstValue) / parseFloat(secondValue);
        if (operator === "modulo")
            newResult = parseFloat(firstValue) % parseFloat(secondValue);

        calculatorDisplay.textContent = newResult.toString();
    }

    if (buttonType === "clear") {
        console.log("Pressed clear");
    }

    calculator.dataset.previousButtonType = buttonType;
});
