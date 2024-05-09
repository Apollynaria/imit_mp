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
    change_link: {
        type: String,
        default: "/"
    },
    change_schedule_link: {
        type: String,
        default: "/"
    },
    border: {
        type: Boolean,
        default: false
    },
    file: {
        type: String
    }
});

</script>

<template>
    <div class="p-3 h-full">
        <q-card :bordered="border" :dark="isDarkTheme" class="my-card bg-[#fff] dark:bg-[#142437] h-full flex flex-col">
            <div class="text-[18px] text-[#1f2731] dark:text-[#fff] mx-4 mt-3 font-semibold ">
                {{ props.title }}
            </div>
            <div class="flex-grow"></div>

            <q-card-section class="flex-1">
                <q-separator :dark="isDarkTheme" />
                <div class="text-h7 text-orange-8 font-semibold mt-2">{{ props.date }}</div>
                <div v-if="date_request" class="text-h7 text-secondary font-semibold">
                    Прием заявок: {{ props.date_request }}
                </div>
                <div class="my-4">
                    <q-btn class="mt-2 w-full" color="primary" label="Изменить" :to="change_link" />
                    <q-btn class="mt-2 w-full" color="secondary" label="Конструктор расписания" :to="change_schedule_link" />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<style lang="scss" scoped></style>