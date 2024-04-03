<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const props = defineProps({
    title: {
        type: String,
        default: "Title"
    },
    text: {
        type: String,
        default: "Description"
    },
    icon: {
        type: String,
        default: ""
    },
    color: {
        type: Array,
        default: []
    }
});

</script>

<template>
    <div class="p-3">
        <q-card :dark="isDarkTheme" class="bg-[#fff] dark:bg-[#142437] text-[#000] dark:text-[#fff] my-card">
            <q-card-section>
                <Icon class="mb-2 text-[#1976D2]" :name="props.icon" size="50"/>
                <div class="text-h5">{{ props.title }}</div>
            </q-card-section>

            <q-separator :dark="isDarkTheme" inset />

            <q-card-section>
                {{ props.text }}
            </q-card-section>

            <q-card-actions class="p-3">
                <q-btn class="w-full" color="primary" label="ПОДРОБНЕЕ"></q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<style lang="scss" scoped></style>