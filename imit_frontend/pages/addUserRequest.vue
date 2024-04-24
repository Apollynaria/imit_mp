<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'
import { getFullDate } from '../services/Date'

useSeoMeta({
    title: 'Подать заявку',
})
definePageMeta({
    layout: 'admin'
})

const request = reactive({
    user_id: null,
    conference_id: null,
    section_id: null,
    name: '',
    comment: '',
    file_id: null
})


const config = useRuntimeConfig()
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const IdConference = useRoute().query.conference;

const { pending, data: conference } = await useAsyncData(
    'conference',
    () => $fetch(`${config.public.apiBase}/conferenceForRequest/${IdConference}`, {})
);

const options = ref([]);

const sections = conference.value.sections;

sections.forEach(section => {
    const userOption = { id: section.id, label: `${section.name}`, conference_id: section.conference_id };
    options.value.push(userOption);
});

console.log(options.value)
const model = ref(null);

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="flex justify-between">
                <q-btn class="ms-2 mb-2" to="/conferencesRequest" color="primary" icon="arrow_back_ios" label="Назад" />
                <q-btn class="ms-2 mb-2" :to="`/conference/${IdConference}`" color="secondary" label="О мероприятии" />
            </div>
            <div class="p-2 text-[#1f2731] text-center dark:text-[#fff]">
                <div class="text-h5">Мероприятие: «{{ conference.name }}»</div>
                <div class="text-[16px] font-normal">Дата проведения: {{ getFullDate(conference.date_begin,
                    conference.date_end) }}</div>
                <div class="text-[16px] font-normal">Дата подачи тезисов: {{
                    getFullDate(conference.date_for_request_begin, conference.date_for_request_end) }}</div>
            </div>

            <q-input class="p-2" clearable clear-icon="close" outlined :dark="isDarkTheme" v-model="request.name"
                label="Название доклада" lazy-rules>
                <template v-slot:prepend>
                    <q-icon name="edit" />
                </template>
            </q-input>

            <div class="flex flex-col md:flex-row p-2">

                <q-select class="flex-1" :dark="isDarkTheme" outlined
                    v-model="model" use-input fill-input hide-selected input-debounce="0" label="Секция"
                    :options="options" >
                    <template v-slot:prepend>
                        <q-icon name="grid_view" />
                    </template>
                </q-select>

                <q-file class="flex-1 md:ms-2 md:mt-0 mt-2" clearable clear-icon="close" :dark="isDarkTheme" outlined
                    v-model="request.file_id" label="Тезисы .tex .zip">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>

            </div>

            <q-input outlined class="p-2" :dark="isDarkTheme" v-model="request.comment" type="textarea"
                label="Комментарий" lazy-rules />

        </div>


        <div class="flex justify-center mt-2">
            <q-btn @click="" label="Создать заявку" type="button" color="primary" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>