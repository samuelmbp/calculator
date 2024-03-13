export const handleOperatorButton = (
    calculatorButtons: HTMLDivElement,
    calculator: HTMLDivElement,
    button: HTMLElement,
    displayValue: string | undefined
) => {
    // Release operator pressed state
    const operatorButtons = [calculatorButtons.children].filter((button) => {
        if (!(button instanceof HTMLElement)) return false;
        button.dataset.buttonType === "operator";
    });

    operatorButtons.forEach((button) => {
        if (!(button instanceof HTMLElement)) return false;
        button.classList.remove("is-pressed");
    });

    button.classList.add("is-pressed");
    calculator.dataset.firstValue = displayValue;
    calculator.dataset.operator = button.dataset.key;
};
