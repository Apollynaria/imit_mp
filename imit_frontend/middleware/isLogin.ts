import { showNotif } from "../services/Notify";

export default defineNuxtRouteMiddleware((to, from) => {

    const $q = useQuasar()
    const authStore = useAuthStore();

    if (authStore.getLoggedIn) {
        showNotif("Пользователь авторизован!", 'green', $q, 'done')
        return navigateTo('/profile')
    }

})