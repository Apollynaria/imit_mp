import { getToken } from '~/services/auth.service';

export const changeUserData = async (user) => {
    const config = useRuntimeConfig()

    const res = await $fetch(`/updateUserData`, {
        baseURL: config.public.apiBase,
        headers: {
            'x-access-token': getToken(),
        },
        method: 'POST',
        body: user
    });

    return res;
}

export const changeUserPassword = async (data) => {
    const config = useRuntimeConfig()

    const res = await $fetch(`/updateUserPassword`, {
        baseURL: config.public.apiBase,
        headers: {
            'x-access-token': getToken(),
        },
        method: 'POST',
        body: data
    });

    return res;
}

export const setAdmin = async (user) => {
 
    const config = useRuntimeConfig()
    const data = {
        is_admin: Number(!user.value.is_admin)
    }

    const res = await $fetch(`/updateUserAdmin/${user.value.id}`, {
        baseURL: config.public.apiBase,
        headers: {
            'x-access-token': getToken(),
        },
        method: 'POST',
        body: data
    });

    return res;

}


export const getUserBoard = async () => {
    // Обращаемся к серверу для проверки, авторизован ли пользователь.
    // Не обрабатываем результат, так как ответ полностью возвращаем в метод, из которого вызывается getUserBoard().

    const res = await $fetch('/userBoard', {
        baseURL: config.public.apiBase,
    });

    return res;
}

