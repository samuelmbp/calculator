import "./style.scss";

// Event delegation pattern to listen to every key.
const calculator = document.querySelector<HTMLDivElement>(".calculator");

if (!calculator) throw new Error("Error while accessing the calculator...");

const calculatorButtons = calculator.querySelector<HTMLDivElement>(
    ".calculator__buttons"
    );

// TODO: Handle null error for buttons and display
if (!calculatorButtons)
    throw new Error("Error while trying to press on the buttons..");

calculatorButtons.addEventListener("click", (event: Event) => {
    // Returns closest ancestor of the current element or the element itself
    const target = event.target as Element;
    if (!target.closest("button")) return;

    const button = event.target as HTMLElement;
    const buttonType: string | undefined = button.dataset.buttonType;

    if (buttonType === "number") {
        console.log("Pressed number");
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
