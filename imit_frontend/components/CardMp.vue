<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const props = defineProps({
    title: {
        type: String,
        default: "Title"
    },
    short_description: {
        type: String,
        default: "Description"
    },
    date: {
        type: String,
        default: "01.01.2001 - 01.01.2001"
    },
    date_request: {
        type: String,
    },
    page_link: {
        type: String,
        default: "/"
    },
    register_link: {
        type: String,
    },
    border: {
        type: Boolean,
        default: false
    }
});

</script>

<template>
    <div class="p-3 h-full">
        <q-card :bordered="border" :dark="isDarkTheme" class="my-card bg-[#fff] dark:bg-[#142437] h-full flex flex-col no-shadow">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-h6">
                    {{ props.title }}
                </div>
            </q-img>

            <q-card-section class="flex-1">
                <div class="text-h7 text-orange-8 font-semibold">{{ props.date }}</div>
                <div v-if="date_request" class="text-h7 text-secondary font-semibold">Прием заявок: {{
                    props.date_request }}</div>
                <div class="my-4">
                    <q-separator :dark="isDarkTheme" />
                </div>
                <div class="text-h7 text-#[000] dark:text-[#fff] mt-4">
                    {{ props.short_description }}
                </div>
            </q-card-section>

            <q-card-actions class="mt-auto">
                <q-btn color="primary" label="Подробнее" :to="page_link" />
                <q-btn v-if="register_link" color="secondary" :to="register_link">
                    Заявка 
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<style lang="scss" scoped></style>