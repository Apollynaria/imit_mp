<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import {classDarkTheme} from '../services/DarkTheme'
import {createFormattedDate} from '../services/DataRules'

useSeoMeta({
    title: 'Создание конференции',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const conference = reactive({
    name: null,
    short_description: null,

    dateRange: {
        from: '',
        to: ''
    },

    dateForRequestRange: {
        from: '',
        to: ''
    },

    full_description: '',

    dateForTesisRange: {
        from: '',
        to: ''
    },

    location: null
})

const dateToString = computed(() => createFormattedDate(conference.dateRange));
const dateForRequestToString = computed(() => createFormattedDate(conference.dateForRequestRange));
const dateForTesisToString = computed(() => createFormattedDate(conference.dateForTesisRange));

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Новая конференция</div>

            <div class="flex flex-col md:flex-row p-2">
                <q-input clearable clear-icon="close" outlined class="flex-1" :dark="isDarkTheme"
                    v-model="conference.name" label="Название конференции" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="badge" />
                    </template>
                </q-input>
                <q-input clearable clear-icon="close" outlined class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
                    v-model="conference.location" label="Место проведения" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="place" />
                    </template>
                </q-input>
            </div>

            <div class="flex flex-col md:flex-row p-2">
                <q-input readonly class="flex-1" :dark="isDarkTheme" outlined v-model="dateToString"
                    label="Даты проведения">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="conference.dateRange" range>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input readonly class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined
                    v-model="dateForRequestToString" label="Даты подачи заявок">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="conference.dateForRequestRange" range>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input readonly class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme" outlined
                    v-model="dateForTesisToString" label="Даты подачи тезисов (при наличии)">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="conference.dateForTesisRange" range>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Описание конференции</div>

            <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                v-model="conference.short_description" label="Краткое описание (для карточек)" lazy-rules />



            <q-input outlined class="p-2" :dark="isDarkTheme" v-model="conference.full_description" type="textarea"
                label="Описание (Markdown)" placeholder="Напишите для предпросмотра" lazy-rules />

            <Markdown class="prose dark:prose-invert" :source="conference.full_description.toString()" />

        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Секции</div>

            <q-btn label="Добавить секцию" type="button" color="primary" />

        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Организационный комитет</div>



        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Программный комитет</div>



        </div>

    </div>
</template>

<style scoped>
.markdown {
    color: red;
}

h1 .markdown {
    color: red;
}
</style>