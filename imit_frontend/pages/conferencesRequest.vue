<script setup lang="ts">
import { getFullDate } from '../services/Date';
import { serverLink } from '~/services/server';

useSeoMeta({
    title: 'Текущие конференции',
})
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

const config = useRuntimeConfig()
const { pending, data: conferences } = await useAsyncData(
    'conferences',
    () => $fetch(`${config.public.apiBase}/conferencesForRequest`, {})
);

</script>

<template>
    <div class="p-5">
        <div class="rounded-lg p-3 mb-3">
            <div v-if="!conferences">Конференций нет</div>
            <div v-else>
                <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Выберите конференцию</div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardMp v-for="(conference, index) in conferences" :key="index" :border="true"
                        :title="conference.name" :short_description="conference.short_description"
                        :date="getFullDate(conference.date_begin, conference.date_end)"
                        :date_request="getFullDate(conference.date_for_request_begin, conference.date_for_request_end)"
                        :page_link="`/conference/${conference.id}`"
                        :register_link="`/addUserRequest?conference=${conference.id}`"
                        :file="serverLink + conference.title_file.path.substring(8)">
                    </CardMp>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>