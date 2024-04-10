<script setup lang="ts">
import AuthService from '../services/auth.service';
import { NOT_NULL_RULES } from "../services/DataRules"
import { showNotif } from "../services/Notify"

definePageMeta({
    layout: 'star'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const loginFromRoute = ref(useRoute().query.login);
const isPwd = ref(true);
const loading = ref(false);
const user = reactive({
    login: loginFromRoute,
    password: null,
})
const $q = useQuasar()
const color_input = ref('grey-8')

const handleLogin = () => {
    loading.value = true

    AuthService.login(user)
        .then(() => {
            showNotif("Авторизация прошла успешно!", 'green', $q, 'done')
            window.location.href = '/profile'
        })
        .catch(e => {
            console.log(e.response)
            color_input.value = 'red'
            showNotif(e.response._data.message, 'red', $q)
        })
        .finally(() => {
            loading.value = false
        })
}

</script>

<template>
    <div>
        <form-login-and-register title="Вход в систему" :loading="loading" @on-submit="handleLogin"
            sumbit_title="Войти">
            <template v-slot:form>
                <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" class="p-2" :dark="isDarkTheme" outlined
                    v-model="user.login" label="Логин" lazy-rules :label-color="color_input">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>

                <q-input :rules="NOT_NULL_RULES" v-model="user.password" class="flex-1 p-2 mt-4 mb-4" :dark="isDarkTheme"
                    outlined :type="isPwd ? 'password' : 'text'" label="Пароль" :label-color="color_input">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </template>
            <template v-slot:buttons>
                <div>
                    <nuxt-link to="/register"
                        class="text-[16px] transition-all duration-400 pb-[1px] border-b border-transparent hover:border-[#000] text-[#000] dark:hover:border-[#fff] dark:text-[#fff]"
                        type="button">
                        Регистрация
                    </nuxt-link>
                </div>
                <div>
                    <nuxt-link to="/home"
                        class="text-[16px] transition-all duration-400 pb-[1px] border-b border-transparent hover:border-[#000] text-[#000] dark:hover:border-[#fff] dark:text-[#fff]"
                        type="button">
                        На главную
                    </nuxt-link>
                </div>
            </template>
        </form-login-and-register>
    </div>
</template>

<style></style>