<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'
import { changeUserData, changeUserPassword } from '../services/user.service'
import { showNotif } from "../services/Notify"
import { NOT_NULL_RULES } from "../services/DataRules"
import { getToken } from '~/services/auth.service';

useSeoMeta({
    title: 'Профиль',
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const isPwd = ref(true);
const isPwdNew = ref(true);
const isPwdRepeat = ref(true);
const config = useRuntimeConfig()
const $q = useQuasar()
const oldPassword = ref(null)
const newPassword = ref(null)
const repeatPassword = ref(null)
const loading = ref(false);


const { pending, data: user_details } = await useAsyncData(
    'user_details',
    () => $fetch(`${config.public.apiBase}/userProfile`, {
        headers: {
            'x-access-token': getToken(),
        }
    })
);

const onChangeUserData = (user_details) => {
    loading.value = true;
    changeUserData(user_details)
        .then(() => {
            showNotif("Данные успешно изменены!", 'green', $q, 'done')
        })
        .catch(e => {
            console.log(e.response)
            showNotif(e.response._data.message, 'red', $q)
        })
        .finally(() => {
            loading.value = false
        })
}

const onChangeUserPassword = (user_details) => {
    if (repeatPassword.value !== newPassword.value) {
        showNotif("Пароли не совпадают!", 'red', $q)
        return
    }

    loading.value = true;

    let data = {
        id: user_details.id,
        password: oldPassword.value,
        newPassword: newPassword.value
    }

    changeUserPassword(data)
        .then(() => {
            showNotif("Пароль изменен!", 'green', $q, 'done');
            newPassword.value = null;
            oldPassword.value = null;
            repeatPassword.value = null;
        })
        .catch(e => {
            console.log(e.response)
            showNotif(e.response._data.message, 'red', $q)
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>
    <div class="p-5">
        <div v-if="pending">
            Загрузка ...
        </div>
        <q-form v-else @submit.prevent="onChangeUserData(user_details)">
            <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

                <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Данные аккаунта</div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" readonly outlined color="primary" class="flex-1"
                        :dark="isDarkTheme" v-model="user_details.login" label="Логин" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input :rules="NOT_NULL_RULES" readonly outlined class="flex-1 md:ms-2 md:mt-0 mt-2"
                        :dark="isDarkTheme" v-model="user_details.email" label="E-mail" type="email" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="email" />
                        </template>
                    </q-input>
                </div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" outlined class="flex-1" :dark="isDarkTheme"
                        v-model="user_details.phone" label="Телефон" lazy-rules mask="+7(###) ### - ####" fill-mask>
                        <template v-slot:prepend>
                            <q-icon name="phone" />
                        </template>
                    </q-input>
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined
                        class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" v-model="user_details.place_of_work"
                        label="Место работы" lazy-rules />
                </div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined class="flex-1"
                        :dark="isDarkTheme" v-model="user_details.surname" label="Фамилия" lazy-rules />
                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined
                        class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" v-model="user_details.name" label="Имя"
                        lazy-rules />
                </div>

                <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                    v-model="user_details.patronymic" label="Отчество (при наличии)" lazy-rules />


                <div class="p-2">
                    <q-btn label="Сохранить" :loading="loading" :disable="loading" type="submit" color="primary" />
                </div>
            </div>
        </q-form>


        <q-form @submit.prevent="onChangeUserPassword(user_details)">
            <div :class="classDarkTheme" class="rounded-lg p-3">

                <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Изменение пароля</div>
                <q-input :rules="NOT_NULL_RULES" lazy-rules outlined class="p-2" :dark="isDarkTheme" v-model="oldPassword"
                    :type="isPwd ? 'password' : 'text'" label="Текущий пароль">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>

                <div class="flex flex-col md:flex-row p-2 mt-4">
                    <q-input :rules="NOT_NULL_RULES" lazy-rules outlined v-model="newPassword" class="flex-1 mb-2"
                        :dark="isDarkTheme" :type="isPwdNew ? 'password' : 'text'" label="Новый пароль">
                        <template v-slot:append>
                            <q-icon :name="isPwdNew ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwdNew = !isPwdNew" />
                        </template>
                    </q-input>
                    <q-input :rules="NOT_NULL_RULES" lazy-rules outlined v-model="repeatPassword"
                        class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                        :type="isPwdRepeat ? 'password' : 'text'" label="Повторите пароль">
                        <template v-slot:append>
                            <q-icon :name="isPwdRepeat ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwdRepeat = !isPwdRepeat" />
                        </template>
                    </q-input>
                </div>

                <div class="p-2">
                    <q-btn label="Изменить пароль" type="submit" color="primary" />
                </div>
            </div>
        </q-form>

    </div>
</template>

<style lang="scss" scoped></style>