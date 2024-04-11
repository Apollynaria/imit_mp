export const NOT_NULL_RULES = [
    val => (val && val.length > 0) || 'Заполните значение'
]

export const createFormattedDate = (dateRange) => {
    return dateRange.from && dateRange.to ? `${dateRange.from} - ${dateRange.to}` : '';
};