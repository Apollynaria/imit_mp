<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import { classDarkTheme } from '../../services/DarkTheme';
import { createFormattedDate } from '../../services/Date';
import { getToken } from '~/services/auth.service';
import { showNotif } from '~/services/Notify';
import { getDateString } from '~/services/Date';
import { getDate } from '~/services/Date';
import { myLocale } from '~/services/Date';
import { NOT_NULL_RULES } from "~/services/DataRules";
import { NOT_NULL_SELECT_FILE } from '~/services/DataRules';
import { serverLink } from '~/services/server';

useSeoMeta({
    title: 'Изменение конференции',
})
definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin-conference'],
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const is_admin = ref(false);

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
    schedule_file: null,
    resulst: ''
})
const config = useRuntimeConfig()
const users = ref([]);
const route = useRoute();
const conferenceId = route.params.id;
try {
    const fetchedUsers = await $fetch(`/users`, {
        baseURL: config.public.apiBase,
        headers: {
            'x-access-token': getToken(),
        },
    });

    is_admin.value = true;

    fetchedUsers.forEach(user => {
        const userOption = { id: user.id, label: `${user.surname} ${user.name} ${user.patronymic}`, is_admin: Boolean(user.is_admin) };
        users.value.push(userOption);
    });

    const getConference = await $fetch(`/conferenceAdmin/${conferenceId}`, {
        baseURL: config.public.apiBase,
        headers: {
            'x-access-token': getToken(),
        },
    });

    console.log(getConference)

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
    conference.schedule_file = getConference.schedule_file;
    conference.collection_file = getConference.collection_file;
    conference.sections = getConference.sections;
    conference.org_comm = getConference.org_comm;
    conference.progr_comm = getConference.progr_comm;

    conference.sections.forEach(section => {
        section.user_sections = section.user_sections.map(user_section => {
            return {
                id: user_section.user.id,
                label: `${user_section.user.surname} ${user_section.user.name} ${user_section.user.patronymic}`,
                is_admin: Boolean(user_section.user.is_admin)
            }
        })
    });

    conference.org_comm = conference.org_comm.map(user_org => {
        return {
            id: user_org.user.id,
            label: `${user_org.user.surname} ${user_org.user.name} ${user_org.user.patronymic}`,
            type: user_org.type,
            is_admin: Boolean(user_org.user.is_admin)
        }
    });

    conference.progr_comm = conference.progr_comm.map(user_progr => {
        return {
            id: user_progr.user.id,
            label: `${user_progr.user.surname} ${user_progr.user.name} ${user_progr.user.patronymic}`,
            type: user_progr.type,
            is_admin: Boolean(user_progr.user.is_admin)
        }
    });

    console.log(conference)

} catch (error) {
    console.error(error);
    users.value = [];
    is_admin.value = false;
}

const dateToString = computed(() => createFormattedDate(conference.dateRange));
const dateForRequestToString = computed(() => createFormattedDate(conference.dateForRequestRange));
const $q = useQuasar()
const file = ref()

const getSection = (section) => {
    if (!conference.sections.find(e => e.name === section.name)) {
        conference.sections.push(section);
        console.log(conference);
    } else {
        showNotif("Секция с таким именем уже добавлена", 'red', $q)
    }
}

const getOrgComm = (secretary) => {
    if (!conference.org_comm.find(e => e.id === secretary.id)) {
        conference.org_comm.push(secretary);
        console.log(conference);
    } else {
        showNotif("Пользователь уже добавлен", 'red', $q)
    }
}

const getProgComm = (secretary) => {
    if (!conference.progr_comm.find(e => e.id === secretary.id)) {
        conference.progr_comm.push(secretary);
        console.log(conference);
    } else {
        showNotif("Пользователь уже добавлен", 'red', $q)
    }
}

const newTitle_file = ref(null);
const newCollection_file = ref(null);
const newSchedule_file = ref(null);


const updateConference = async () => {
    let formData = new FormData();
    formData.append('id', conferenceId);
    formData.append('name', conference.name);
    formData.append('short_description', conference.short_description);
    formData.append('date_begin', getDate(conference.dateRange.from));
    formData.append('date_end', getDate(conference.dateRange.to));
    formData.append('date_for_request_begin', getDate(conference.dateForRequestRange.from));
    formData.append('date_for_request_end', getDate(conference.dateForRequestRange.to));
    formData.append('full_description', conference.full_description);
    formData.append('location', conference.location);
    formData.append('title_file', newTitle_file.value);

    formData.append('sections', JSON.stringify(conference.sections));
    formData.append('org_comm', JSON.stringify(conference.org_comm));
    formData.append('progr_comm', JSON.stringify(conference.progr_comm));

    formData.append('collection_file', newCollection_file.value);
    // formData.append('schedule_file', newSchedule_file.value);
    formData.append('result_text', conference.resulst);


    try {

        const updatedConference = await $fetch(`/updateConference`, {
            baseURL: config.public.apiBase,
            method: 'POST',
            body: formData,
            headers: {
                'x-access-token': getToken(),
            },
        });

        showNotif(updatedConference.message, 'green', $q);

    } catch (error) {
        console.error(error);
        showNotif(error, 'red', $q)
    }
}

const deleteConference = async () => {
    const deletedConference = await $fetch(`/deleteConference/${conference.id}`, {
        baseURL: config.public.apiBase,
        method: 'GET',
        headers: {
            'x-access-token': getToken(),
        },
    });
}

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="flex justify-between">
                <q-btn class="ms-2 mb-2" to="/changeConference" color="primary" icon="arrow_back_ios" label="Назад" />
            </div>

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Изменение конференции</div>

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
                                <q-date :locale="myLocale" v-model="conference.dateRange" range :dark="isDarkTheme">
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
                                <q-date :locale="myLocale" v-model="conference.dateForRequestRange" range :dark="isDarkTheme">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>



            <!-- <q-btn icon="event" round color="primary" no-caps> -->
            <!-- <q-popup-proxy cover transition-show="scale" transition-hide="scale"> -->
            <div class="p-2">
                <q-img class="max-w-[700px] " :src="serverLink + conference.title_file.path.substring(8)"
                    style="max-width: 150px" />
            </div>
            <!-- </q-popup-proxy> -->
            <!-- </q-btn> -->

            <q-file clearable clear-icon="close" :dark="isDarkTheme" outlined v-model="newTitle_file"
                label="Новая фотография конференции .jpg .png" class="p-2">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>

        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Описание конференции</div>
            <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                v-model="conference.short_description" label="Краткое описание для карточек" lazy-rules />
            <q-input outlined class="p-2" :dark="isDarkTheme" v-model="conference.full_description" type="textarea"
                label="Описание Markdown" placeholder="Напишите разметку для предпросмотра" lazy-rules />
            <Markdown class="prose dark:prose-invert p-2"
                :source="conference.full_description ? conference.full_description.toString() : '> :sparkles: *Работает MarkDown!* :P :sparkles:'" />
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Секции</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                <q-card v-for="(section, ind) in conference.sections" :key="ind"
                    class="my-card no-shadow border-solid border-[1px] border-sky-500 dark:bg-transparent"
                    :dark="isDarkTheme">
                    <q-card-section>
                        <div class="flex justify-between">
                            <q-btn flat @click="" round size="13px" color="secondary" icon="edit" />
                            <q-btn flat @click="conference.sections.splice(ind, 1)" round size="13px" color="red-4"
                                icon="delete" />
                        </div>
                        <div class="font-bold text-[16px] uppercase">{{ section.name }}</div>
                        <div class="font-medium text-[15px]">{{ section.description }}</div>
                        <q-separator class="my-2" :dark="isDarkTheme" />
                        <ul class="list-disc mx-4 mt-2" v-for="(user, ind) in section.user_sections" :key="ind">
                            <li>{{ user.label }}</li>
                        </ul>
                    </q-card-section>
                </q-card>
            </div>
            <add-section class="my-2" :users="users" @on-submit="getSection"></add-section>
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Организационный комитет</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2 "
                v-if="conference.org_comm.length !== 0">
                <q-card class="my-card no-shadow border-solid border-[1px] border-sky-500 dark:bg-transparent"
                    :dark="isDarkTheme">
                    <q-card-section>
                        <div class="font-bold text-[16px]">Председатели</div>
                        <q-separator class="my-2" :dark="isDarkTheme" />
                        <ul class="mt-2" v-for="(user, ind) in conference.org_comm" :key="ind">
                            <li v-if="user.type === 'main'">
                                <q-btn flat @click="conference.org_comm.splice(ind, 1)" round size="10px"
                                    color="secondary" icon="close" />
                                {{ user.label }}
                            </li>
                        </ul>
                    </q-card-section>
                </q-card>
                <q-card class="my-card no-shadow border-solid border-[1px] border-sky-500 dark:bg-transparent"
                    :dark="isDarkTheme">
                    <q-card-section>
                        <div class="font-bold text-[16px]">Заместители</div>
                        <q-separator class="my-2" :dark="isDarkTheme" />
                        <ul class="mt-2" v-for="(user, ind) in conference.org_comm" :key="ind">
                            <li v-if="user.type !== 'main'">
                                <q-btn flat @click="conference.org_comm.splice(ind, 1)" round size="10px"
                                    color="secondary" icon="close" />
                                {{ user.label }}
                            </li>
                        </ul>
                    </q-card-section>
                </q-card>
            </div>
            <add-admin-conference :users="users" class="p-2" @on-submit="getOrgComm"
                title="Секретари организационного комитета"></add-admin-conference>
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Программный комитет</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2 "
                v-if="conference.progr_comm.length !== 0">
                <q-card class="my-card no-shadow border-solid border-[1px] border-sky-500 dark:bg-transparent"
                    :dark="isDarkTheme">
                    <q-card-section>
                        <div class="font-bold text-[16px]">Председатели</div>
                        <q-separator class="my-2" :dark="isDarkTheme" />
                        <ul class="mt-2" v-for="(user, ind) in conference.progr_comm" :key="ind">
                            <li v-if="user.type === 'main'">
                                <q-btn flat @click="conference.progr_comm.splice(ind, 1)" round size="10px"
                                    color="secondary" icon="close" />
                                {{ user.label }}
                            </li>
                        </ul>
                    </q-card-section>
                </q-card>
                <q-card class="my-card no-shadow border-solid border-[1px] border-sky-500 dark:bg-transparent"
                    :dark="isDarkTheme">
                    <q-card-section>
                        <div class="font-bold text-[16px]">Заместители</div>
                        <q-separator class="my-2" :dark="isDarkTheme" />
                        <ul class="mt-2" v-for="(user, ind) in conference.progr_comm" :key="ind">
                            <li v-if="user.type !== 'main'">
                                <q-btn flat @click="conference.progr_comm.splice(ind, 1)" round size="10px"
                                    color="secondary" icon="close" />
                                {{ user.label }}
                            </li>
                        </ul>
                    </q-card-section>
                </q-card>
            </div>
            <add-admin-conference :users="users" class="p-2" @on-submit="getProgComm"
                title="Секретари программного комитета"></add-admin-conference>
        </div>

        <!-- <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Расписание конференции</div>

            <a class="p-2" v-if="conference.schedule_file" style="text-decoration: none;" download=""
                :href="serverLink + conference.schedule_file.path.substring(8)" target="_blank">
                <q-btn color="secondary">
                    <q-icon left name="description" />
                    <div>Файл расписания</div>
                </q-btn>
            </a>

            <q-file clearable clear-icon="close" :dark="isDarkTheme" outlined v-model="newSchedule_file"
                label="Новый файл расписания .xlsx" class="p-2">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>

        </div> -->

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Результаты конференции</div>

            <a class="p-2" v-if="conference.collection_file" style="text-decoration: none;" download=""
                :href="serverLink + conference.collection_file.path.substring(8)" target="_blank">
                <q-btn color="secondary">
                    <q-icon left name="description" />
                    <div>Сборник тезисов</div>
                </q-btn>
            </a>

            <q-file clearable clear-icon="close" :dark="isDarkTheme" outlined v-model="newCollection_file"
                label="Новый файл сборника тезисов" class="p-2">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>

            <q-input outlined class="p-2" :dark="isDarkTheme" v-model="conference.resulst" type="textarea"
                label="Результаты конференции Markdown" placeholder="Напишите разметку для предпросмотра" lazy-rules />
            <Markdown class="prose dark:prose-invert p-2"
                :source="conference.resulst ? conference.resulst.toString() : '> :sparkles: *Работает MarkDown!* :P :sparkles:'" />

        </div>

        <div class="flex justify-between mt-2">
            <q-btn @click="deleteConference" label="Удалить" type="button" color="red-8" />
            <q-btn @click="updateConference" label="Сохранить" type="button" color="primary" />
        </div>



    </div>
</template>

<style scoped></style>