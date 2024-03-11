import { calculate } from "./calculate";

export const handleEqual = (
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
