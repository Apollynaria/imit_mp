<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import {classDarkTheme} from '../services/DarkTheme'

useSeoMeta({
    title: 'Профиль',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const isPwd = ref(true);
const isPwdNew = ref(true);
const isPwdRepeat = ref(true);
const user_details = reactive({
    login: 'ivanov2002',
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    password: '',
    place_of_work: 'ИМИТ ИГУ, 02471-ДБ',
    email: '123@mail.ru',
    phone: '9500885977',
})

const authStore = useAuthStore()

console.log(authStore.getLoggedIn)
const loggedIn = computed(() => authStore.getLoggedIn)

if(loggedIn){
    // window.location.href = '/profile';
    console.log(loggedIn.value)
}
</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Данные аккаунта</div>

            <div class="flex flex-col md:flex-row p-2">
                <q-input readonly outlined color="primary" class="flex-1" :dark="isDarkTheme"
                    v-model="user_details.login" label="Логин" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input readonly outlined class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                    v-model="user_details.email" label="E-mail" type="email" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
            </div>

            <div class="flex flex-col md:flex-row p-2">
                <q-input outlined class="flex-1" :dark="isDarkTheme" v-model="user_details.phone" label="Телефон"
                    lazy-rules mask="+7(###) ### - ####" fill-mask>
                    <template v-slot:prepend>
                        <q-icon name="phone" />
                    </template>
                </q-input>
                <q-input clearable clear-icon="close" outlined class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                    v-model="user_details.place_of_work" label="Место работы" lazy-rules />
            </div>

            <div class="flex flex-col md:flex-row p-2">
                <q-input clearable clear-icon="close" outlined class="flex-1" :dark="isDarkTheme"
                    v-model="user_details.surname" label="Фамилия" lazy-rules />
                <q-input clearable clear-icon="close" outlined class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                    v-model="user_details.name" label="Имя" lazy-rules />
            </div>

            <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                v-model="user_details.patronymic" label="Отчество (при наличии)" lazy-rules />


            <div class="p-2">
                <q-btn label="Сохранить" to="/profile" type="button" color="primary" />
            </div>
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Изменение пароля</div>
            <q-input outlined class="p-2" :dark="isDarkTheme" v-model="user_details.password"
                :type="isPwd ? 'password' : 'text'" label="Текущий пароль">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
            </q-input>

            <div class="flex flex-col md:flex-row p-2">
                <q-input outlined v-model="newPassword" class="flex-1" :dark="isDarkTheme"
                    :type="isPwdNew ? 'password' : 'text'" label="Новый пароль">
                    <template v-slot:append>
                        <q-icon :name="isPwdNew ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwdNew = !isPwdNew" />
                    </template>
                </q-input>
                <q-input outlined v-model="repeatPassword" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                    :type="isPwdRepeat ? 'password' : 'text'" label="Повторите пароль">
                    <template v-slot:append>
                        <q-icon :name="isPwdRepeat ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwdRepeat = !isPwdRepeat" />
                    </template>
                </q-input>
            </div>

            <div class="p-2">
                <q-btn label="Изменить пароль" to="/profile" type="button" color="positive" />
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped></style>