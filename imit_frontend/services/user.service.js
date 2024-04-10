
async function getUserBoard() {
    // Обращаемся к серверу для проверки, авторизован ли пользователь.
    // Не обрабатываем результат, так как ответ полностью возвращаем в метод, из которого вызывается getUserBoard().

    const res = await $fetch('/userBoard', {
        baseURL: config.public.apiBase,
    });

    return res;
}

export default {
    getUserBoard: getUserBoard
};