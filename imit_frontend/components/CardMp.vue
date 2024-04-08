<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const props = defineProps({
    title: {
        type: String,
        default: "Title"
    },
    description: {
        type: String,
        default: "Description"
    },
    date: {
        type: String,
        default: "00.00.0000"
    },
});

</script>

<template>
    <div class="p-3 h-full">
        <q-card :dark="isDarkTheme" class="my-card bg-[#fff] dark:bg-[#142437] h-full flex flex-col no-shadow">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom text-h6">
                    {{ props.title }}
                </div>
            </q-img>

            <q-card-section class="flex-1">
                <div class="text-overline text-orange-9 font-semibold">{{ props.date }}</div>
                <div class="text-caption text-#[000] dark:text-[#fff]">
                    {{ props.description }}
                </div>
            </q-card-section>

            <q-card-actions class="mt-auto">
                <q-btn color="primary" label="Подробнее" />
                <q-btn color="secondary">
                    Регистрация
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<style lang="scss" scoped></style>