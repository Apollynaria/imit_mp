export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();

    if (!authStore.getUserIsAdminConference) {
        return navigateTo('/profile')
    }

})