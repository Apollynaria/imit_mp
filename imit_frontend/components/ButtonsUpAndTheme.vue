<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

</script>

<template>
    <div class="z-40 fixed top-[10px] right-[10px]">
        <q-btn round @click="themeStore.switchTheme" :color="themeStore.getTheme == 'light'? 'dark' : 'primary'" :icon="themeStore.getTheme == 'light'? 'dark_mode' : 'light_mode'" size="md"/>
    </div>
    <div class="z-40 fixed bottom-[10px] right-[10px]">
        <q-btn round @click="scrollTop" :color="themeStore.getTheme == 'light'? 'dark' : 'primary'" icon="arrow_upward" size="md"/>
    </div>
</template>


<style lang="scss" scoped>

</style>