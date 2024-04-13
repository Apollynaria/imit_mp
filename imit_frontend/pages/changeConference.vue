<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'

useSeoMeta({
    title: 'Изменить конференцию',
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

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Выберите конференцию</div>


        </div>
    </div>
</template>

<style lang="scss" scoped></style>