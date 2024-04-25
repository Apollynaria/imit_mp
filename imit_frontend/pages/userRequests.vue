<script setup lang="ts">
import { getToken } from '~/services/auth.service';
import { classDarkTheme } from '../services/DarkTheme'
import { getFullDate } from '../services/Date';
import { getRequestTxT } from '../services/EnumRequests';

useSeoMeta({
    title: 'Заявки пользователя',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const config = useRuntimeConfig()

const requests = await $fetch(`/userRequests`, {
    baseURL: config.public.apiBase,
    headers: {
        'x-access-token': getToken(),
    },
});

console.log(requests);

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Ваши заявки</div>



            <div v-for="(request, ind) in requests" :key="ind" :class="classDarkTheme" class="rounded-lg p-2 mb-3">

                <q-card bordered flat :dark="isDarkTheme"
                    class="no-shadow transition-all duration-500 bg-inherit cursor-pointer hover:border-slate-300">
                    <q-card-section>
                        <q-card-section class="p-0">
                            <div class="flex flex-col md:flex-row justify-between">
                                <div class="text-orange-8">Даты проведения: {{ getFullDate(request.conference.date_begin, request.conference.date_end)}} </div>
                                <q-btn color="primary" outline class="pointer-events-none flex-end"
                                    :label="getRequestTxT(request.status)" />
                            </div>
                            <div class="">Проверка тезисов: {{ getFullDate(request.conference.date_for_request_begin, request.conference.date_for_request_end)}} </div>
                            <div class="text-[24px] q-mt-sm q-mb-xs">{{ request.conference.name }}</div>
                            <div class="text-[18px] q-mt-sm q-mb-xs">Секция: {{ request.section.name }}</div>

                        </q-card-section>
                    </q-card-section>

                    <!-- <q-card-actions class="p-3">
                        <q-btn color="secondary" outline class="pointer-events-none q-mt-sm q-mb-xs"
                                label="Тезисы" />
                    </q-card-actions> -->
                </q-card>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>