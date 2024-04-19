<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'

useSeoMeta({
    title: 'Заявки пользователя',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const requests = reactive([{
    id: 1,
    section_name: 'Дискретная математика и информационные технологии',
    conference_name: 'Конференция 1',
    conference_date: '11.03.2024 - 15.03.2024',
    status_request: 'На проверке',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua.',
    file: 'hhh.tex'
}
])

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Ваши заявки</div>



            <div v-for="(request, ind) in requests" :key="ind" :class="classDarkTheme" class="rounded-lg p-2 mb-3">

                <q-card class="my-card" flat bordered>
                    <q-card-section>
                        <q-card-section class="p-0">
                            <div class="flex flex-col md:flex-row justify-between">
                                <div class="">{{ request.conference_date }} </div>
                                <q-btn color="primary" outline class="pointer-events-none flex-end"
                                    :label="request.status_request" />
                            </div>
                            <div class="text-[28px] q-mt-sm q-mb-xs">{{ request.conference_name }}</div>
                            <div class="text-[18px] q-mt-sm q-mb-xs">Секция: {{ request.section_name }}</div>
                            <div class="text-[14px] text-grey" v-if="request.comment">
                                Сообщение: {{ request.comment }}
                            </div>
                            <q-btn color="secondary" outline size="12px" class="pointer-events-none q-mt-sm q-mb-xs"
                                label="Тезисы" />
                        </q-card-section>
                    </q-card-section>

                </q-card>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>