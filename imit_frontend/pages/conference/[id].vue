<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { getDateString } from '~/services/Date';
import Markdown from 'vue3-markdown-it';

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const cards_mp = ref([
    { title: 'Конференция 1', description: 'Lorem ipsum dolor sit amet.', date: '12.05.2024' },
    { title: 'Конференция 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '15.05.2024' },
    { title: 'Конференция 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '17.05.2024' },
    { title: 'Конференция 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '19.05.2024' },
    { title: 'Конференция 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '21.05.2024' },
])

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }

})
const config = useRuntimeConfig()
const route = useRoute();
const conferenceId = route.params.id;

const conference = reactive({
    name: null,
    short_description: null,
    dateRange: {
        from: null,
        to: null
    },
    dateForRequestRange: {
        from: null,
        to: null
    },
    full_description: '',
    location: null,
    sections: [],
    org_comm: [],
    progr_comm: [],
    title_file: null
})

const getConference = await $fetch(`/conference/${conferenceId}`, {
    baseURL: config.public.apiBase,
});

conference.name = getConference.name;
conference.short_description = getConference.short_description;
conference.dateRange.from = getDateString(getConference.date_begin);
conference.dateRange.to = getDateString(getConference.date_end);
conference.dateForRequestRange.from = getDateString(getConference.date_for_request_begin);
conference.dateForRequestRange.to = getDateString(getConference.date_for_request_end);
conference.full_description = getConference.full_description;
conference.location = getConference.location;
conference.resulst = getConference.result_text;

console.log(conference)
const dateRange = ref({ from: '2020/07/08', to: '2020/07/17' })
// sections: [],
// org_comm: [],
// progr_comm: [],
// title_file: null,
// collection_file: null,
// schedule_file: null,

console.log(getConference)
</script>

<template>
    <div>
        <StarBackground>
            <Navbar></Navbar>
            <div class="h-[83%] flex flex-col items-center justify-center">

                <div class="flex justify-center mb-2">
                    <img src="../imit_nobackground.png" class="w-[200px] transition-all duration-400 mt-3" alt="">
                </div>

                <div class="mb-2 text-[40px]">
                    Конференции ИМИТ ИГУ
                </div>

                <q-btn outline style="color: white;" size="15px" label="Подробнее" no-caps />

            </div>
        </StarBackground>


        <div class="w-90 mx-auto max-w-screen-xl">

            <div :class="classLogo" class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]">

                <div>
                    <div class="text-h5 font-semibold">{{ conference.name }}</div>
                    <div>{{ conference.short_description }}</div>

                    <q-date v-model="dateRange" range />
                    <q-date v-model="conference.dateForRequestRange" range />
                </div>
                <div>

                </div>

                <div class="text-h5 text-center font-semibold mb-2">
                    О конференции
                </div>

                <div class="flex justify-center">
                    <Markdown class="prose dark:prose-invert p-2"
                        :source="conference.full_description ? conference.full_description.toString() : ''" />
                </div>


            </div>


        </div>
    </div>
</template>

<style>
.w-fulls{
    width: 100% !important;
}
</style>