export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    if (!authStore.getLoggedIn) {
        return navigateTo('/login')
    }

})