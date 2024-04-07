<script setup lang="ts">
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)


definePageMeta({
    layout: 'star'
})

const options = ['', '02241-ДБ', '02212-ДБ', '02214-ДМ']

const newUser = reactive({
    login: '',
    name: '',
    surname: '',
    patronymic: '',
    password: '',
    group: '',
})

const repeatPassword = ref('');

</script>

<template>
    <div class="flex bg-image flex-center">
        <form-login-and-register title="Регистрация в системе" maxWidth="80%" :is-login="false">

            <div class="flex flex-col md:flex-row">
                <q-input label-color="red" class="flex-1" :dark="isDarkTheme" filled v-model="newUser.login" label="Логин"
                    lazy-rules />
                <q-select class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" filled v-model="newUser.group" label="Группа"
                    :options="options" />
            </div>

            <div class="flex flex-col md:flex-row">
                <q-input label-color="red" class="flex-1" :dark="isDarkTheme" filled v-model="newUser.surname" label="Фамилия"
                    lazy-rules />
                <q-input label-color="red" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" filled v-model="newUser.name"
                    label="Имя" lazy-rules />
            </div>

            <q-input class="" :dark="isDarkTheme" filled v-model="newUser.patronymic" label="Отчество (при наличии)"
                lazy-rules />

            <div class="flex flex-col md:flex-row">
                <q-input label-color="red" class="flex-1" :dark="isDarkTheme" type="password" filled v-model="newUser.password"
                    label="Пароль" lazy-rules />
                <q-input label-color="red" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" type="password"
                    filled v-model="repeatPassword" label="Повторите пароль" lazy-rules />
            </div>

            <div>
                <q-btn label="Зарегистрироваться" to="/profile" type="button" color="primary" />
            </div>
            <div>
                <nuxt-link to="/home"
                    class="text-[16px] mb-3 transition-all duration-400 pb-[1px] border-b border-transparent hover:border-[#000] text-[#000] dark:hover:border-[#fff] dark:text-[#fff]"
                    type="button">
                    На главную
                </nuxt-link>
            </div>
        </form-login-and-register>
    </div>
</template>


<style>
.bg-image {
    background-image: radial-gradient(ellipse at bottom, #142437 10%, #090a0f 100%);
}
</style>