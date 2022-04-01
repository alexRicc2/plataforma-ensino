export const PercentageMask = value => {
    return (Clamp(parseFloat(value.replace(/[^0-9]/g, "") * 0.01), 0, 100 * 0.01)).toLocaleString("pt-BR", { style: "percent" });
}

export const Clamp = (number, min, max) => {
    return Math.min(Math.max(number, min), max);
}
