export const handleClearButton = (
    display: HTMLDivElement,
    calculator: HTMLDivElement,
    button: HTMLElement
) => {
    display.textContent = "0";
    button.textContent = "AC";
    // Deletes data attributes.
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
};
