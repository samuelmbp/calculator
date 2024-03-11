export const handleOperatorButton = (
    calculator: HTMLDivElement,
    button: HTMLElement,
    displayValue: string | undefined
) => {
    button.classList.add("is-pressed");
    calculator.dataset.firstValue = displayValue;
    calculator.dataset.operator = button.dataset.key;
};
