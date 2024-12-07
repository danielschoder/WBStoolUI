export const formatMoney = (value: number): string => {
    return new Intl.NumberFormat("en-GB", { minimumFractionDigits: 0 }).format(value);
};
