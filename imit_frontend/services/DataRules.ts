export const NOT_NULL_RULES = [
    val => (val && val.length > 0) || 'Заполните значение'
]

export const createFormattedDate = (date) => {
    if (date === null || date.from === null || date.to === null){
        return null;
    }
    return date.from && date.to ? `${date.from} - ${date.to}` : date;
};