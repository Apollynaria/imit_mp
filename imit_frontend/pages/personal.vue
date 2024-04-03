<script setup lang="ts">

useSeoMeta({
    title: 'HomePage',
})
definePageMeta({
  layout: 'admin'
})

import { useThemeStore } from '@/stores/theme'
import { ref } from 'vue'
const themeStore = useThemeStore()
const theme = ref(themeStore.getTheme)


const switchTheme = () => {
  themeStore.switchTheme()
}
</script>

<template>
    <div>
        <q-btn @click=switchTheme outline color="primary" size="15px" label="Тема" no-caps />
    </div>
</template>

<style lang="scss" scoped>

</style>