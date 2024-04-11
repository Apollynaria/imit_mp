<script setup lang="ts">
import AuthService from '../services/auth.service';
import { NOT_NULL_RULES } from "../services/DataRules"
import { showNotif } from "../services/Notify"

definePageMeta({
    layout: 'star'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const isPwd = ref(true);
const isPwdRepeat = ref(true);
const newUser = reactive({
    login: '',
    name: '',
    surname: '',
    patronymic: '',
    password: '',
    place_of_work: '',
    email: '',
    phone: '',
})
const repeatPassword = ref('');
const $q = useQuasar()
const color_input = ref('grey-8')
const router = useRouter()
const loading = ref(false);

const handleRegister = () => {
    if(repeatPassword.value !== newUser.password){
        showNotif("Пароли не совпадают!", 'red', $q)
        return
    }
    AuthService.register(newUser)
        .then(() => {
            showNotif("Пользователь зарегистрирован!", 'green', $q, 'done')
            router.push({ path: '/login', query: { login: newUser.login } })
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
    <div class="flex bg-image flex-center">
        <form-login-and-register title="Регистрация" maxWidth="80%" :is-login="false" :loading="loading" @on-submit="handleRegister" sumbit_title="Зарегистрироваться">

            <template v-slot:form>
                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" class="flex-1" :dark="isDarkTheme" outlined
                        v-model="newUser.login" label="Логин" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                        outlined v-model="newUser.email" label="E-mail" type="email" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="email" />
                        </template>
                    </q-input>
                </div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" class="flex-1" :dark="isDarkTheme" outlined v-model="newUser.phone" label="Телефон"
                        lazy-rules mask="+7(###) ### - ####" fill-mask>
                        <template v-slot:prepend>
                            <q-icon name="phone" />
                        </template>
                    </q-input>
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                        outlined v-model="newUser.place_of_work" label="Место работы, должность" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="work" />
                        </template>
                    </q-input>
                </div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" class="flex-1" :dark="isDarkTheme" outlined
                        v-model="newUser.surname" label="Фамилия" lazy-rules />
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                        outlined v-model="newUser.name" label="Имя" lazy-rules />
                </div>

                <q-input clearable clear-icon="close" class="p-2" :dark="isDarkTheme" outlined
                    v-model="newUser.patronymic" label="Отчество (при наличии)" lazy-rules />

                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" v-model="newUser.password" class="flex-1" :dark="isDarkTheme" outlined
                        :type="isPwd ? 'password' : 'text'" label="Пароль">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                    </q-input>
                    <q-input :rules="NOT_NULL_RULES" v-model="repeatPassword" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined
                        :type="isPwdRepeat ? 'password' : 'text'" label="Повторите пароль">
                        <template v-slot:append>
                            <q-icon :name="isPwdRepeat ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwdRepeat = !isPwdRepeat" />
                        </template>
                    </q-input>
                </div>
            </template>

            <template v-slot:buttons>
                <div>
                    <button-underline title="Есть аккаунт? Войти" link="/login" />
                </div>
                <div>
                    <button-underline title="На главную" link="/home" />
                </div>
            </template>

        </form-login-and-register>
    </div>
</template>


<style>
.bg-image {
    background-image: radial-gradient(ellipse at bottom, #142437 10%, #090a0f 100%);
}
</style>