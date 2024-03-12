export const handleDecimalButton = (display: HTMLDivElement) => {
    const displayValue = display.textContent ?? "";

    if (displayValue !== undefined && !displayValue.includes(".")) {
        display.textContent = displayValue + ".";
    }
};
