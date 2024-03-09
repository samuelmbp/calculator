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
    const result = calculatorDisplay.textContent;

    if (buttonType === "number" && key) {
        if (result === "0") {
            calculatorDisplay.textContent = key;
        } else {
            // Append the number to the displayed result.
            calculatorDisplay.textContent = result + key;
        }
    }

    if (buttonType === "decimal") {
        console.log("Pressed decimal");
    }

    if (buttonType === "operator") {
        console.log("Pressed operator");
    }

    if (buttonType === "equal") {
        console.log("Pressed equal");
    }

    if (buttonType === "clear") {
        console.log("Pressed clear");
    }
});
