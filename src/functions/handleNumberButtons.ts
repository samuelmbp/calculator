export const handleNumberButtons = (
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
