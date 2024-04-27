export const getDate = (dateString) => {

    if (dateString) {
        const dateComponents = dateString.split("/"); // Разбиваем строку по разделителю "/"
        // Первый элемент массива - год, второй - месяц (начиная с 0), третий - день
        const year = parseInt(dateComponents[0]);
        const month = parseInt(dateComponents[1]) - 1; // Месяцы в объекте Date начинаются с 0
        const day = parseInt(dateComponents[2]);
        // Создаем объект Date
        const date = new Date(year, month, day);
        return date;
    }
    else {
        return null;
    }
}

export const getDateString = (dateString) => {
    const date = new Date(dateString);
    if (date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const newDate = new Date(year, month, day);
        const formattedDate = `${newDate.getFullYear()}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${String(newDate.getDate()).padStart(2, '0')}`;
        return formattedDate;
    } else {
        return null;
    }
};

export const getFullDate = (begin_date, end_date) => {

    const begin_date_rus = getDateString(begin_date)?.split('/').reverse().join('.');
    const end_date_rus = getDateString(end_date)?.split('/').reverse().join('.');

    return `${begin_date_rus} - ${end_date_rus}`

}

export const myLocale = reactive({
    days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
    monthsShort: 'Янв_Февр_Март_Апр_Май_Июнь_Июль_Авг_Сент_Окт_Нояб_Дек'.split('_'),
    firstDayOfWeek: 1,
    format24h: true,
    pluralDay: 'дней'
});

export const createFormattedDate = (date) => {
    if (date === null || date.from === null || date.to === null){
        return null;
    }
    return date.from && date.to ? getFullDate(date.from, date.to) : date;2
};