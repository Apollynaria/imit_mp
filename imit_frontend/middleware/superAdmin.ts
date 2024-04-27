export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    if (!authStore.getUserIsSuperAdmin) {
        return navigateTo('/profile')
    }

})