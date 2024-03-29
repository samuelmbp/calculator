import "./style.scss";
import { handleNumberButtons } from "./functions/handleNumberButtons";
import { handleDecimalButton } from "./functions/handleDecimalButton";
import { handleOperatorButton } from "./functions/handleOperatorButton";
import { handleEqual } from "./functions/handleEqual";
import { handleClearButton } from "./functions/handleClearButton";
import { handleDeleteButton } from "./functions/handleDeleteButton";

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

    if (buttonType !== "clear") {
        const clearButton = calculator.querySelector(".clear");
        if (!clearButton) return;
        clearButton.textContent = "CE";
    }

    switch (buttonType) {
        case "clear":
            handleClearButton(calculatorDisplay, calculator, button);
            break;
        case "number":
            handleNumberButtons(calculator, button, calculatorDisplay);
            break;
        case "decimal":
            handleDecimalButton(calculatorDisplay);
            break;
        case "operator":
            handleOperatorButton(
                calculatorButtons,
                calculator,
                button,
                displayValue
            );
            break;
        case "equal":
            handleEqual(calculator, displayValue, calculatorDisplay);
            break;
        case "delete":
            handleDeleteButton(calculatorDisplay);
            break;
    }

    calculator.dataset.previousButtonType = buttonType;
});
