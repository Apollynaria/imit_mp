async function login(user) {
    const config = useRuntimeConfig()
    var data = {
        login: user.login,
        password: user.password
    };

    const res = await $fetch('/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
    });

    if (res.accessToken) {
        localStorage.setItem('user', JSON.stringify(res));
    }

    return res;

}

function logout() {
    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}

// обработка обновления токена
// на стороне сервера установили время действия токена, если после указанного времени пользователь всё ещё работает в системе,
// то нужно сгенерировать другой токен
async function refreshToken(user) {

    const config = useRuntimeConfig()

    var data = {
        login: user.login
    };

    const res = await $fetch('/refreshToken', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
    });

    if (res.accessToken) {
        localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
}

// декодируем токен jwt, чтобы в вызывающем методе использовать время (понадобится для проверки срока действия токена)
function jwtDecrypt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split("")
            .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

// проверяем срока действия токена
function tokenAlive(exp) {
    // Date.now() - возвращает дату сразу в виде миллисекунд
    // exp - время из JWT токена по формату Unix Time
    // Чтобы сравнить время, нужно exp перевести в миллисекунды
    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
}

async function register(user) {

    const config = useRuntimeConfig()

    var data = {
        login: user.login,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        password: user.password,
        place_of_work: user.place_of_work,
        email: user.email,
        phone: user.phone,
    };

    const res = await $fetch('/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
    });

    return res;
}

export default {
    login: login,
    logout: logout,
    refreshToken: refreshToken,
    jwtDecrypt: jwtDecrypt,
    tokenAlive: tokenAlive,
    register: register
};