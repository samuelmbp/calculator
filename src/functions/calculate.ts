export const calculate = (
    firstValue: string,
    operator: string,
    secondValue: string
) => {
    if (operator === "plus")
        return parseFloat(firstValue) + parseFloat(secondValue);
    if (operator === "minus")
        return parseFloat(firstValue) - parseFloat(secondValue);
    if (operator === "times")
        return parseFloat(firstValue) * parseFloat(secondValue);
    if (operator === "divide")
        return parseFloat(firstValue) / parseFloat(secondValue);
    if (operator === "modulo")
        return parseFloat(firstValue) % parseFloat(secondValue);

    throw new Error("Invalid operator");
};
