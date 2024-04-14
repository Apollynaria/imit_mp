
export const changeUserData = async (user) => {
    const config = useRuntimeConfig()

    const res = await $fetch(`/updateUserData/${user.id}`, {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: user
    });

    return res;
}

export const changeUserPassword = async (data) => {
    const config = useRuntimeConfig()

    const res = await $fetch(`/updateUserPassword/${data.id}`, {
        baseURL: config.public.apiBase,
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
        method: 'POST',
        body: data
    });

    return res;


}
