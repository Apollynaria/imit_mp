<script setup lang="ts">
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

definePageMeta({
    layout: 'star'
})

const isPwd = ref(true);
const user = reactive({
    login: null,
    password: null,
})

</script>

<template>
    <div>
        <form-login-and-register title="Вход в систему">
            <template v-slot:form>
                <q-input clearable clear-icon="close" class="p-2" :dark="isDarkTheme" outlined v-model="user.login"
                    label="Логин" lazy-rules />

                <q-input v-model="user.password" class="flex-1 p-2" :dark="isDarkTheme" outlined
                    :type="isPwd ? 'password' : 'text'" label="Пароль">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>
            </template>
            <template v-slot:buttons>
                <div>
                    <q-btn label="Войти" to="/profile" type="button" color="primary" />
                </div>
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