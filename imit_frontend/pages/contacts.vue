<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'

useSeoMeta({
    title: 'Поддержка',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Контакты</div>

            <div class="text-h7 q-mt-sm q-mb-xs ms-2">Разработчик: Дергунова Полина Павловна</div>
            <div class="text-h7 q-mt-sm q-mb-xs ms-2">Группа: 02471-ДБ</div>
            <div class="text-h7 q-mt-sm q-mb-xs ms-2">Email: a.polly.narii@gmail.com</div>

        </div>
    </div>
</template>

<style lang="scss" scoped></style>