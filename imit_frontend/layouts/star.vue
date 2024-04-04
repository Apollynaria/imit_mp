<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<template>
    <div :class="themeStore.getTheme">
        <div class='bg-[#e2e2e2] dark:bg-[#081626]'>
            <ButtonsUpAndTheme :showUp="false" />
            <StarBackground>
                <NuxtPage />
            </StarBackground>
        </div>
    </div>
</template>

<style></style>