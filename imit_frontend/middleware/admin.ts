export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    if (!authStore.getUserIsAdmin) {
        return navigateTo('/profile')
    }

})