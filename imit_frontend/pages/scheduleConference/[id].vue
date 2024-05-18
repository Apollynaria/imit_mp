<script setup lang="ts">
import { classDarkTheme } from '../../services/DarkTheme';
import { getToken } from '~/services/auth.service';
import { getRequestTxT, getEnumKeyFromText } from '../../services/EnumRequests';
import { getColorFromStatus } from '../../services/Status';
import { VueDraggableNext } from 'vue-draggable-next'
import { showNotif } from '~/services/Notify';

useSeoMeta({
    title: 'Расписание',
})
definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const config = useRuntimeConfig()
const router = useRouter();
const route = useRoute();
const conferenceId = route.params.id;
const $q = useQuasar();

const conference = await $fetch(`/conferenceForSchedule/${conferenceId}`, {
    baseURL: config.public.apiBase,
    headers: {
        'x-access-token': getToken(),
    },
});

console.log(conference);

conference.sections.forEach(section => {
    section.user_requests.forEach((request, index) => {
        if (request.schedule === null) {
            request.schedule = {};
            request.schedule.time = ref('10:00');
        }
    });
});

const sortRequestsByOrder = (section) => {
    section.user_requests.sort((a, b) => {
        if (a.schedule.order !== null && b.schedule.order !== null) {
            return a.schedule.order - b.schedule.order;
        } else if (a.schedule.order !== null) {
            return -1;
        } else if (b.schedule.order !== null) {
            return 1;
        } else {
            return 0;
        }
    });
};

conference.sections.forEach(section => {
    sortRequestsByOrder(section);
});

console.log(conference.sections)

const conference_ref = ref(conference);

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }
})


const addSchedule = async () => {

    conference_ref.value.sections.forEach(section => {
        section.user_requests.forEach((request, index) => {
            request.schedule.order = index + 1;
        })
    });

    console.log(conference_ref.value);

    const data = conference_ref.value;
    data.conference_id = conferenceId;

    try {

        const res = await $fetch('/addSchedule', {
            baseURL: config.public.apiBase,
            headers: {
                'x-access-token': getToken(),
            },
            method: 'POST',
            body: data
        });

        showNotif(res.message, 'green', $q);
    }
    catch {
        console.error(error);
        showNotif(error, 'red', $q)
    }
}

</script>

<template>
    <div class="p-5">

        <div class="rounded-lg p-3 mb-3">

            <div class="rounded p-3 mb-5" :class="classLogo">
                <div class="text-h6 text-[#1f2731] dark:text-[#fff] mb-3 ms-2">{{ conference_ref.name }}. Расписание
                </div>

                <div class="flex flex-col mt-6 p-3" v-for="section in conference_ref.sections" :key="section.id">
                    <div class="-my-2 overflow-x-auto">
                        <div class="shadow overflow-hidden rounded-lg">
                            <div class="text-[#1f2731] dark:text-[#fff] text-[16px] mb-2">Секция: {{ section.name }}
                            </div>
                            <table
                                class="min-w-full text-sm dark:text-gray-400 text-gray-900 divide-y divide-slate-700">
                                <thead class="dark:bg-gray-900 bg-gray-300 text-[14px] uppercase font-medium">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                            Id заявки
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                            Время
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                            Название доклада
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                            ФИО
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                            Статус заявки
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                            Сообщение
                                        </th>
                                    </tr>
                                </thead>
                                <VueDraggableNext v-model="section.user_requests" tag="tbody"
                                    class="divide-y divide-slate-700">
                                    <tr v-for="(request, index) in section.user_requests" :key="request.id"
                                        class="dark:bg-gray-800 bg-gray-100 text-[16px]">
                                        <td class="pl-4 whitespace-nowrap">
                                            {{ index + 1 }}
                                        </td>
                                        <td class="pl-4 whitespace-nowrap">
                                            <nuxt-link class="underline text-blue" :to="`/userRequest/${request.id}`">{{
                                                request.id }}</nuxt-link>
                                        </td>
                                        <td class="pl-4 whitespace-nowrap">
                                            <q-input class="mt-2" :dark="isDarkTheme" v-model="request.schedule.time"
                                                mask="time" :rules="['time']">
                                                <template v-slot:append>
                                                    <q-icon name="access_time" class="cursor-pointer">
                                                        <q-popup-proxy cover transition-show="scale"
                                                            transition-hide="scale">
                                                            <q-time :dark="isDarkTheme" v-model="request.schedule.time">
                                                                <div class="row items-center justify-end">
                                                                    <q-btn v-close-popup label="Close" color="primary"
                                                                        flat />
                                                                </div>
                                                            </q-time>
                                                        </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                            </q-input>
                                        </td>
                                        <td class="px-6 py-4" style="word-break: break-word;">{{ request.name }}</td>
                                        <td class="px-6 py-4" style="word-break: break-word;">{{ request.user.surname }} {{
                                            request.user.name }} {{ request.user.patronymic }}</td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                            <q-btn :size="xs" :color=getColorFromStatus(request.status) outline class="flex-end"
                                                :label="getRequestTxT(request.status)" />
                                        </td>
                                        <td class="px-6 py-4" style="word-break: break-word;">{{ request.comment }}</td>
                                    </tr>
                                </VueDraggableNext>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <q-btn color="primary me-2" @click="addSchedule">
                <div>Сохранить</div>
            </q-btn>
            <q-btn color="secondary">
                <q-icon left name="download" />
                <div>Скачать Excel</div>
            </q-btn>
        </div>
    </div>
</template>

<style></style>