<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import { classDarkTheme } from '../services/DarkTheme'
import { createFormattedDate } from '../services/DataRules'
import { getToken } from '~/services/auth.service';
import { showNotif } from '~/services/Notify';

useSeoMeta({
    title: 'Создание конференции',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const is_admin = ref(false);

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
    location: null,
    sections: [],
    org_comm: [],
    progr_comm: [],
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
const file = ref()

const getSection = (section) => {
    if (!conference.sections.find(e => e.name === section.name)) {
        conference.sections.push(section);
        console.log(conference);
    } else {
        showNotif("Секция уже добавлена", 'green', $q)
    }
}

const getOrgComm = (secretary) => {
    if (!conference.org_comm.find(e => e.id === secretary.id)) {
        conference.org_comm.push(secretary);
        console.log(conference);
    } else {
        showNotif("Пользователь уже добавлен", 'green', $q)
    }
}

const getProgComm = (secretary) => {
    if (!conference.progr_comm.find(e => e.id === secretary.id)) {
        conference.progr_comm.push(secretary);
        console.log(conference);
    } else {
        showNotif("Пользователь уже добавлен", 'green', $q)
    }
}

</script>

<template>
    <div class="text-[#1f2731] dark:text-[#fff] p-5" v-if="!is_admin">
        У вас нет доступа к этому контенту.
    </div>
    <div v-else class="p-5">

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
                                <q-date v-model="conference.dateRange" range :dark="isDarkTheme">
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
                                <q-date v-model="conference.dateForRequestRange" range :dark="isDarkTheme">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>

            <q-file clearable clear-icon="close" :dark="isDarkTheme" outlined v-model="file"
                label="Фотография конференции .jpg .png" class="p-2">
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
            <q-card v-for="(section, ind) in conference.sections" :key="ind" class="my-card" :dark="isDarkTheme">
                <q-card-section>
                    {{ section.name }}
                    {{ section.description }}
                    <div v-for="(user, ind) in section.section_users" :key="ind">
                        {{ user.label }}
                    </div>
                </q-card-section>
            </q-card>
            <add-section :users="users" @on-submit="getSection"></add-section>
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Организационный комитет</div>

            <div class="text-h7 text-bold mt-2 text-[#1f2731] dark:text-[#fff]">Председатели</div>
            {{ conference.org_comm }}
            <div class="text-h7 text-bold mt-2 text-[#1f2731] dark:text-[#fff]">Заместители</div>

            <add-admin-conference :users="users" class="p-2" @on-submit="getOrgComm"
                title="Секретари организационного комитета"></add-admin-conference>
        </div>

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Программный комитет</div>
            <div class="text-h7 text-bold mt-2 text-[#1f2731] dark:text-[#fff]">Председатели</div>
            {{ conference.progr_comm }}
            <div class="text-h7 text-bold mt-2 text-[#1f2731] dark:text-[#fff]">Заместители</div>

            <add-admin-conference :users="users" class="p-2" @on-submit="getProgComm"
                title="Секретари программного комитета"></add-admin-conference>
        </div>

        <div class="flex justify-center mt-2">
            <q-btn @click="" label="Добавить конференцию" type="button" color="primary" />
        </div>

    </div>
</template>

<style scoped></style>