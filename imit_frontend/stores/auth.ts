import AuthService from '../services/auth.service'
import { defineStore } from 'pinia'

let initialState = {}

if (process.client) {
    const user = JSON.parse(localStorage.getItem('user'));
    initialState = user // состояния: авторизованный или неавторизованный пользователь
        ? { status: { loggedIn: true }, user }
        : { status: { loggedIn: false }, user: null };
}

export const useAuthStore = defineStore('auth', () => {

    const state = reactive(initialState);

    function loginSuccess(loggedInUser) {
        state.status.loggedIn = true
        Object.keys(loggedInUser).forEach(key => user[key] = loggedInUser[key])
    }

    function loginFailure() {
        state.status.loggedIn = false
        Object.assign(user, {})
    }

    function logoutUser() {
        state.status.loggedIn = false
        Object.assign(user, {})
    }

    function registerSuccess() {
        state.status.loggedIn = false
    }

    function registerFailure() {
        state.status.loggedIn = false
    }

    const getState = computed(() => state)

    const getLoggedIn = computed(() => state.status.loggedIn)

    async function login(_user) {
        try {
            const loggedInUser = await AuthService.login(_user)
            loginSuccess(loggedInUser)
            return loggedInUser
        } catch (error) {
            loginFailure()
            return Promise.reject(error)
        }
    }

    async function logout() {
        AuthService.logout()
        logoutUser()
    }

    async function register(_user) {
        try {
            await AuthService.register(_user)
            registerSuccess()
            return Promise.resolve()
        } catch (error) {
            registerFailure()
            return Promise.reject(error)
        }
    }

    return {
        state, login, logout, register, loginSuccess, loginFailure, logoutUser, registerSuccess, registerFailure, getState, getLoggedIn
    }

})