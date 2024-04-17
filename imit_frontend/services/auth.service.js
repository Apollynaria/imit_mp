async function login(user) {
    const config = useRuntimeConfig()
    let data = {
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

async function logout(user) {
    const config = useRuntimeConfig()

    let data = {
        login: user.login
    };

    const res = await $fetch('/logout', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
    });

    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}

// обработка обновления токена
// на стороне сервера установили время действия токена, если после указанного времени пользователь всё ещё работает в системе,
// то нужно сгенерировать другой токен
async function refreshToken(user) {

    const config = useRuntimeConfig()

    let data = {
        login: user.login
    };

    const res = await $fetch('/refreshToken', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
    })

    if (res.accessToken) {
        localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
}

export const getToken = () => {
    let token = "";
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        token = user.accessToken;
    }
    return token;
}

export const jwtDecrypt = () => {
    try {
        let base64Url = getToken().split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split("")
                .map((c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }
    catch{
        return false;
    }
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

    let data = {
        login: user.login,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        password: user.password,
        place_of_work: user.place_of_work,
        email: user.email,
        phone: user.phone,
    }

    const res = await $fetch('/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
    })

    console.log(data)
    return res
}

export default {
    login: login,
    logout: logout,
    refreshToken: refreshToken,
    // jwtDecrypt: jwtDecrypt,
    tokenAlive: tokenAlive,
    register: register
};