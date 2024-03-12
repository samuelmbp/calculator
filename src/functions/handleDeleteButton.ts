export const handleDeleteButton = (calculatorDisplay: HTMLDivElement) => {
    let currentValue = calculatorDisplay.textContent ?? "0";
    currentValue = currentValue.slice(0, -1);
    if (currentValue === "") currentValue = "0";

    calculatorDisplay.textContent = currentValue;
};
