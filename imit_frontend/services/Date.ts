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