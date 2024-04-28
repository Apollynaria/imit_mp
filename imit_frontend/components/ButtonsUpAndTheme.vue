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

const props = defineProps({
    showUp: {
        type: Boolean,
        default: true
    }
});

</script>

<template>
    <div class="z-40 fixed top-[10px] right-[10px]">
        <q-btn round @click="themeStore.switchTheme" color="primary" :icon="themeStore.getTheme == 'light'? 'dark_mode' : 'light_mode'" size="md"/>
    </div>
    <div v-if="showUp" class="z-40 fixed bottom-[10px] right-[10px]">
        <q-btn round @click="scrollTop" color="primary" icon="arrow_upward" size="md"/>
    </div>
</template>


<style lang="scss" scoped>

</style>