<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<template>
    <div :class=themeStore.getTheme>
        <div class="bg-[#fff] dark:bg-[#142437] dark:text-white">
            <NuxtPage/>
            бубубу
        </div>
    </div>
</template>

<style lang="scss" scoped></style>