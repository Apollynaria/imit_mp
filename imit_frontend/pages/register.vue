<script setup lang="ts">
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

definePageMeta({
    layout: 'star'
})

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

</script>

<template>
    <div class="flex bg-image flex-center">
        <form-login-and-register title="Регистрация" maxWidth="80%" :is-login="false">

            <template v-slot:form>
                <div class="flex flex-col md:flex-row p-2">
                    <q-input clearable clear-icon="close"  class="flex-1" :dark="isDarkTheme" outlined v-model="newUser.login" label="Логин" lazy-rules/>
                    <q-input clearable clear-icon="close"  class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined v-model="newUser.email"
                        label="E-mail" type="email" lazy-rules />
                </div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input class="flex-1" :dark="isDarkTheme" outlined v-model="newUser.phone" label="Телефон"
                        lazy-rules mask="+7(###) ### - ####" fill-mask />
                    <q-input clearable clear-icon="close"  class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined
                        v-model="newUser.place_of_work" label="Место работы" lazy-rules/>
                </div>

                <div class="flex flex-col md:flex-row p-2">
                    <q-input clearable clear-icon="close"  class="flex-1" :dark="isDarkTheme" outlined v-model="newUser.surname" label="Фамилия"
                        lazy-rules />
                    <q-input clearable clear-icon="close"  class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined v-model="newUser.name"
                        label="Имя" lazy-rules />
                </div>

                <q-input clearable clear-icon="close"  class="p-2" :dark="isDarkTheme" outlined v-model="newUser.patronymic" label="Отчество (при наличии)"
                    lazy-rules />

                <div class="flex flex-col md:flex-row p-2">
                    <q-input v-model="newUser.password" class="flex-1" :dark="isDarkTheme" outlined
                        :type="isPwd ? 'password' : 'text'" label="Пароль">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <q-input v-model="repeatPassword" class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined
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
                    <q-btn label="Зарегистрироваться" to="/profile" type="button" color="primary" />
                </div>
                <div>
                    <nuxt-link to="/login"
                        class="text-[16px] transition-all duration-400 pb-[1px] border-b border-transparent hover:border-[#000] text-[#000] dark:hover:border-[#fff] dark:text-[#fff]"
                        type="button">
                        Есть аккаунт? Войти
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


<style>
.bg-image {
    background-image: radial-gradient(ellipse at bottom, #142437 10%, #090a0f 100%);
}
</style>