<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import { classDarkTheme } from '../services/DarkTheme';
import { createFormattedDate } from '../services/Date';
import { getToken } from '~/services/auth.service';
import { showNotif } from '~/services/Notify';
import { getDate } from '~/services/Date';
import { myLocale } from '~/services/Date';
import { NOT_NULL_RULES } from "../services/DataRules";
import { NOT_NULL_SELECT_FILE } from '../services/DataRules';

useSeoMeta({
    title: 'Создание конференции',
})
definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
const route = useRoute()
console.log(route)
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
    title_file: null
})
const config = useRuntimeConfig()
const users = ref([]);
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

} catch (error) {
    console.error(error);
    users.value = [];
    is_admin.value = false;
}

const dateToString = computed(() => createFormattedDate(conference.dateRange));
const dateForRequestToString = computed(() => createFormattedDate(conference.dateForRequestRange));
const $q = useQuasar()
const router = useRouter()

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

const addConference = async () => {
    let formData = new FormData();
    formData.append('name', conference.name);
    formData.append('short_description', conference.short_description);
    formData.append('date_begin', getDate(conference.dateRange.from));
    formData.append('date_end', getDate(conference.dateRange.to));
    formData.append('date_for_request_begin', getDate(conference.dateForRequestRange.from));
    formData.append('date_for_request_end', getDate(conference.dateForRequestRange.to));
    formData.append('full_description', conference.full_description);
    formData.append('location', conference.location);
    formData.append('file', conference.title_file);

    formData.append('sections', JSON.stringify(conference.sections));
    formData.append('org_comm', JSON.stringify(conference.org_comm));
    formData.append('progr_comm', JSON.stringify(conference.progr_comm));

    try {

        const addedConference = await $fetch(`/addConference`, {
            baseURL: config.public.apiBase,
            method: 'POST',
            body: formData,
            headers: {
                'x-access-token': getToken(),
            },
        });

        showNotif(addedConference.message, 'green', $q);
        router.push({ path: `/changeConference` });

    } catch (error) {
        console.error(error);
        showNotif(error, 'red', $q)
    }
}


</script>

<template>
    <q-form class="p-5" @submit.prevent="addConference">
        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Новая конференция</div>

            <div class="flex flex-col md:flex-row p-2">
                <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined class="flex-1" :dark="isDarkTheme"
                    v-model="conference.name" label="Название конференции" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="badge" />
                    </template>
                </q-input>
                <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined class="flex-1 md:ms-2 md:mt-0 mt-2" :dark="isDarkTheme"
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
                                <q-date :rules="NOT_NULL_SELECT_FILE" v-model="conference.dateRange" :locale="myLocale" range :dark="isDarkTheme">
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
                                <q-date v-model="conference.dateForRequestRange" :locale="myLocale" range :dark="isDarkTheme">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>

            <q-file clearable clear-icon="close" :dark="isDarkTheme" outlined v-model="conference.title_file"
                label="Фотография конференции .jpg .png" class="p-2">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>

        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Описание конференции</div>
            <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined class="p-2 mb-3" :dark="isDarkTheme"
                v-model="conference.short_description" label="Краткое описание для карточек" lazy-rules />
            <q-input :rules="NOT_NULL_RULES" outlined class="p-2" :dark="isDarkTheme" v-model="conference.full_description" type="textarea"
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
                        <ul class="list-disc mx-4 mt-2" v-for="(user, ind) in section.users_sections" :key="ind">
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
                            <li v-if="user.type === 'Председатель'">
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
                            <li v-if="user.type !== 'Председатель'">
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
                            <li v-if="user.type === 'Председатель'">
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
                            <li v-if="user.type !== 'Председатель'">
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

        <div class="flex justify-center mt-2">
            <q-btn label="Добавить конференцию" type="submit" color="primary" />
        </div>

    </q-form>
</template>

<style scoped></style>