<template>
    <div>
        <div class="flex justify-center flex-center h-screen z-10 relative">
            <q-card dark:="" :style="$q.screen.lt.md ? { 'width': '70%' } : { 'width': '40%' }"
                class="dark:bg-[#142437] text-[#1f2731] dark:text-[#fff]">
                <q-card-section>
                    <q-avatar size="103px" class="absolute-center shadow-10">
                        <img src="../public/profile.svg">
                    </q-avatar>
                </q-card-section>
                <q-card-section>
                    <div class="text-center q-pt-lg">
                        <div class="col text-h6 ellipsis">
                            Вход в личный кабинет <br> Научные мероприятия ИМИТ ИГУ
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-form class="q-gutter-md">
                        <q-input :dark="isDarkTheme" filled v-model="username" label="Логин" lazy-rules />

                        <q-input :dark="isDarkTheme" type="password" filled v-model="password" label="Пароль"
                            lazy-rules />

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
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

definePageMeta({
    layout: 'star'
})

const username = ref('my-login')
const password = ref('12345')

</script>

<style></style>