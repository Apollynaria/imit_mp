<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { getDateString } from '~/services/Date';
import Markdown from 'vue3-markdown-it';

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)


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
    title_file: null,
    collection_file: null,
    schedule_file: null
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
conference.title_file = getConference.title_file;

const sections = getConference.sections;
const org_comm = getConference.org_comm;
const progr_comm = getConference.progr_comm;

console.log(getConference);

</script>

<template>
    <div>
        <StarBackground>
            <Navbar></Navbar>
            <div class="h-[83%] flex flex-col items-center justify-center">

                <div class="flex justify-center mb-2">
                    <img src="../../imit_nobackground.png" class="w-[200px] transition-all duration-400 mt-3" alt="">
                </div>

                <div class="mb-2 text-[40px]">
                    Конференции ИМИТ ИГУ
                </div>

                <q-btn outline style="color: white;" size="15px" label="Подробнее" no-caps />

            </div>
        </StarBackground>


        <div class="w-90 mx-auto max-w-screen-xl text-center">

            <div :class="classLogo" class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]">
                <div class="p-3">
                    <div class="text-h4 font-semibold mb-4">{{ conference.name }}</div>
                    <div class="w-full flex justify-center">
                        <div class="text-h7 font-light mb-4 max-w-[600px] text-center">{{ conference.short_description
                            }}</div>
                    </div>

                    <div v-if="conference.title_file">
                        <q-img class="mb-4 max-w-[700px]"
                            :src="`http://localhost:3000/` + conference.title_file.path.substring(8)" />
                    </div>

                    <q-btn icon="event" label="Даты проведения" color="primary" class="me-4 mb-4">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date :dark="isDarkTheme" readonly range v-model="conference.dateRange">
                            </q-date>
                        </q-popup-proxy>
                    </q-btn>

                    <q-btn icon="event" label="Даты подачи заявок" color="secondary mb-4">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date color="secondary" :dark="isDarkTheme" readonly range
                                v-model="conference.dateForRequestRange">
                            </q-date>
                        </q-popup-proxy>
                    </q-btn>
                </div>
            </div>

            <div :class="classLogo" class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]">
                <div class="text-h5 text-center font-semibold mb-2">
                    О конференции
                </div>
                <div class="flex justify-center">
                    <Markdown class="prose dark:prose-invert p-2"
                        :source="conference.full_description ? conference.full_description.toString() : ''" />
                </div>
            </div>


            <div class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]">
                <div class="text-h5 text-center font-semibold mb-2">
                    Секции
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                    <q-card v-for="(section, ind) in sections" :key="ind" class="my-card text-left dark:bg-[#142437]"
                        :dark="isDarkTheme">
                        <q-card-section>
                            <div class="font-semibold text-[18px] text-primary">{{ section.name }}</div>
                            <div class="font-light text-[14px]">{{ section.description }}</div>
                            <q-separator class="my-2 text-center" :dark="isDarkTheme" />
                            <ul class="list-disc mx-4 mt-2" v-for="(userSection, ind) in org_comm" :key="ind">
                                <li>{{ userSection.user.surname }} {{ userSection.user.name }}
                                    {{ userSection.user.patronymic }}, {{ userSection.user.email }}</li>
                            </ul>
                        </q-card-section>
                    </q-card>
                </div>
            </div>

            <div class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]">
                <div class="p-2 flex flex-col md:flex-row p-2">
                    <q-card :dark="isDarkTheme"
                        class="bg-[#fff] dark:bg-[#142437] text-[#000] dark:text-[#fff] my-card flex-1">
                        <q-card-section>
                            <q-icon left name="manage_accounts" size="50px" color="secondary" />
                            <div class="text-h5 text-secondary">Организационный комитет</div>
                        </q-card-section>
                        <q-separator :dark="isDarkTheme" inset />
                        <q-card-section>
                            <ul class="list-disc mx-4 mt-2 text-left" v-for="(userComm, ind) in org_comm" :key="ind">
                                <li>{{ userComm.user.surname }} {{ userComm.user.name }}
                                    {{ userComm.user.patronymic }}, {{ userComm.user.email }}</li>
                            </ul>
                        </q-card-section>
                    </q-card>
                    <q-card :dark="isDarkTheme"
                        class="bg-[#fff] md:ms-5 md:mt-0 mt-4 dark:bg-[#142437] text-[#000] dark:text-[#fff] my-card flex-1">
                        <q-card-section>
                            <q-icon left name="people" size="50px" color="purple" />
                            <div class="text-h5 text-purple">Программный комитет</div>
                        </q-card-section>
                        <q-separator :dark="isDarkTheme" inset />
                        <q-card-section>
                            <ul class="list-disc mx-4 mt-2 text-left" v-for="(userComm, ind) in progr_comm" :key="ind">
                                <li>{{ userComm.user.surname }} {{ userComm.user.name }}
                                    {{ userComm.user.patronymic }}, {{ userComm.user.email }}</li>
                            </ul>
                        </q-card-section>
                    </q-card>
                </div>
            </div>


            <!-- <div :class="classLogo" class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]"
                v-if="conference.schedule_file"> -->
            <div :class="classLogo" class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]" v-if="conference.schedule_file">
                <div class="p-3">
                    <div class="text-h5 text-center font-semibold mb-2">
                        Расписание конференции
                    </div>
                    <a style="text-decoration: none;" download=""
                        :href="`http://localhost:3000/` + conference.title_file.path.substring(8)" target="_blank">
                        <q-btn color="primary">
                            <q-icon left name="schedule" />
                            <div>Расписание</div>
                        </q-btn>
                    </a>
                    <q-btn v-if="conference.schedule_file" @click="" target="_blank" label="Сборник" color="primary" />
                </div>
            </div>

            <div :class="classLogo" class="rounded-lg p-3 m-3 text-[#1f2731] dark:text-[#fff]" v-if="conference.result_text || conference.collection_file">
                <div class="p-3">
                    <div class="text-h5 text-center font-semibold mb-2">
                        Результаты конференции
                    </div>
                    <div class="flex justify-center" v-if="conference.result_text">
                        <Markdown class="prose dark:prose-invert p-2" :source="conference.result_text.toString()" />
                    </div>
                    <a v-if="conference.collection_file" style="text-decoration: none;" download=""
                        :href="`http://localhost:3000/` + conference.collection_file.path.substring(8)" target="_blank">
                        <q-btn color="primary">
                            <q-icon left name="description" />
                            <div>Сборник тезисов</div>
                        </q-btn>
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.w-fulls {
    width: 100% !important;
}
</style>