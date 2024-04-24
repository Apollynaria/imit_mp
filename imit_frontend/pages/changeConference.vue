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
const is_admin = ref(false);

</script>

<template>
    <div class="text-[#1f2731] dark:text-[#fff] p-5" v-if="!is_admin">
        У вас нет доступа к этому контенту.
    </div>
    <div v-else class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Выберите конференцию</div>
            <nuxt-link class="p-3 underline" to="/adminConference/1">Конференция 1</nuxt-link>
            

        </div>
    </div>
</template>

<style lang="scss" scoped></style>