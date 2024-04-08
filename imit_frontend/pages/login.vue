<script setup lang="ts">
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

definePageMeta({
    layout: 'star'
})

// const classLogo = computed(() => {
//     console.log('g')
//     return{
//         'bg-[#142437]': (isDarkTheme.value === true),
//         'bg-[#1976D2]' : (isDarkTheme.value === false)
//     }
    
// })

const isPwd = ref(true);
const user = reactive({
    login: '',
    password: '',
})

</script>

<template>
    <div>
       <form-login-and-register title="Вход в систему">
        <q-input :dark="isDarkTheme" filled v-model="user.login" label="Логин" lazy-rules />

        <q-input v-model="user.password" class="flex-1" :dark="isDarkTheme" filled
                    :type="isPwd ? 'password' : 'text'" label="Пароль">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>

        <div class="flex justify-between">
            <q-btn label="Войти" to="/profile" type="button" color="primary" />
            <q-btn label="Регистрация" to="/register" type="button" color="positive" />
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

<style></style>