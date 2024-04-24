<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'
import { getFullDate } from '../services/Date'

useSeoMeta({
    title: 'Текущие конференции',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const router = useRouter()
const config = useRuntimeConfig()
// const conferences = ref([]);

const { pending, data: conferences } = await useAsyncData(
    'conferences',
    () => $fetch(`${config.public.apiBase}/conferencesForRequest`, {})
);

console.log(conferences);

</script>

<template>
    <!-- <div class="text-[#1f2731] dark:text-[#fff] p-5" v-if="!is_admin">
        У вас нет доступа к этому контенту.
    </div>
    <div v-else class="p-5"> -->
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Выберите конференцию</div>


            <div v-if="!conferences">Конференций нет</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardMp v-for="(conference, index) in conferences" :key="index" :border="true" :title="conference.name"
                    :short_description="conference.short_description"
                    :date="getFullDate(conference.date_begin, conference.date_end)"
                    :date_request="getFullDate(conference.date_for_request_begin, conference.date_for_request_end)"
                    :page_link="`/conference/${conference.id}`"
                    :register_link="`/addUserRequest?conference=${conference.id}`">
                </CardMp>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped></style>