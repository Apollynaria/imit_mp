export const NOT_NULL_RULES = [
    val => (val && val.length > 0) || 'Заполните значение'
]

export const NOT_NULL_SELECT_FILE = [
    val => (val) || 'Заполните значение'
]