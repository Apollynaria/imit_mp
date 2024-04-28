<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { getToken } from '~/services/auth.service';
import { classDarkTheme } from '../../services/DarkTheme'
import { getFullDate } from '../services/Date'
import { showNotif } from '~/services/Notify';
import { getRequestTxT } from '../../services/EnumRequests';

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }
})

useSeoMeta({
    title: 'Заявка',
})
definePageMeta({
    layout: 'admin'
})

const config = useRuntimeConfig()
const route = useRoute();
const requestId = route.params.id;

const request = await $fetch(`/request/${requestId}`, {
    baseURL: config.public.apiBase,
    headers: {
        'x-access-token': getToken(),
    },
});

console.log(request)

const $q = useQuasar()
const options = ref([
    { status: 'cancel', label: 'Отмена' },
    { status: 'revision', label: 'На доработке' },
    { status: 'approve', label: 'Принято' },
    { status: 'approve_after_revision', label: 'Принято после доработки' },
    { status: 'approve_another_section', label: 'Принято, изменена секция' },
]);
// const sections = conference.value.sections;

// sections.forEach(section => {
//     const userOption = { id: section.id, label: `${section.name}`, conference_id: section.conference_id };
//     options.value.push(userOption);
// });

// console.log(options.value)
const model_section = ref(null);
const model_change_section = ref(false);
const model_status = ref(null);

const options_sections = ref([]);

request.conference.sections.forEach(section => {
    const userOption = { id: section.id, label: `${section.name}` };
    options_sections.value.push(userOption);
});

const check_message = ref(null);
const router = useRouter();

const addCheck = async () => {
    let data = {
        request_id: request.id,
        message: check_message.value,
        newStatus: model_status.value,
        conference_id: request.conference_id,
    }
    if (model_change_section.value) {
        data['newSection'] = model_section.value;
        console.log(data);
    }
    try {
        const addedCheck = await $fetch(`/addCheck`, {
            baseURL: config.public.apiBase,
            method: 'POST',
            body: data,
            headers: {
                'x-access-token': getToken(),
            },
        });

        showNotif(addedCheck, 'green', $q);
        router.push({ path: `/requests` });

    } catch (error) {
        console.error(error);
        showNotif(error.message, 'red', $q)
    }
}

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="flex justify-between">
                <q-btn class="ms-2 mb-2" @click="$router.back()" color="primary" icon="arrow_back_ios" label="Назад" />
                <div class="text-h6 mb-2 text-[#1f2731] dark:text-[#fff] text-semibold">Заявка пользователя</div>
                <q-btn class="ms-2 mb-2" :to="`/conference/${request.conference.id}`" color="secondary"
                    label="О мероприятии" />
            </div>


            <div class="p-2 text-[#1f2731] dark:text-[#fff]">
                <div class="text-h6 text-semibold">Мероприятие: «{{ request.conference.name }}»</div>
                <div class="text-[16px] font-normal">Статус заявки: {{ getRequestTxT(request.status) }}</div>
                <div class="mt-2">
                    <a style="text-decoration: none;" download=""
                        :href="`http://localhost:3000/` + request.file.path.substring(8)" target="_blank">
                        <q-btn color="primary" no-caps outline>
                            <q-icon left name="upload_file" />
                            <div>ТЕЗИСЫ</div>
                        </q-btn>
                    </a>
                </div>
            </div>

            <q-input class="p-2" readonly outlined :dark="isDarkTheme" v-model="request.name" label="Название доклада"
                lazy-rules>
                <template v-slot:prepend>
                    <q-icon name="edit" />
                </template>
            </q-input>

            <div class="flex flex-col md:flex-row p-2">
                <q-field class="flex-1" readonly outlined :dark="isDarkTheme" label="ФИО" lazy-rules stack-label>
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                    <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{ request.user.surname }} {{
                            request.user.name }} {{ request.user.patronymic }}</div>
                    </template>
                </q-field>

                <q-input class="flex-1 md:ms-2 md:mt-0 mt-2" readonly outlined :dark="isDarkTheme"
                    v-model="request.name" label="Email" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
            </div>

            <q-input class="p-2" readonly :dark="isDarkTheme" outlined v-model="request.section.name" use-input
                fill-input hide-selected input-debounce="0" label="Секция">
                <template v-slot:prepend>
                    <q-icon name="grid_view" />
                </template>
            </q-input>

            <q-input v-if="request.comment" outlined class="p-2" :dark="isDarkTheme" readonly v-model="request.comment"
                type="textarea" label="Комментарий" lazy-rules />

        </div>

        <div v-if="true">

            <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

                <div class="text-h6 ms-2 mb-2 text-[#1f2731] dark:text-[#fff]">Ответ на заявку</div>

                <q-toggle v-model="model_change_section" checked-icon="check" color="red"
                    :label="model_change_section ? 'Изменить секцию' : 'Не изменять секцию'" :dark="isDarkTheme"
                    unchecked-icon="clear" />

                <q-select v-if="model_change_section" class="p-2" :dark="isDarkTheme" outlined v-model="model_section"
                    use-input fill-input hide-selected input-debounce="0" label="Секция" :options="options_sections">
                    <template v-slot:prepend>
                        <q-icon name="grid_view" />
                    </template>
                </q-select>

                <q-select class="p-2" :dark="isDarkTheme" outlined v-model="model_status" use-input fill-input
                    hide-selected input-debounce="0" label="Статус заявки" :options="options">
                    <template v-slot:prepend>
                        <q-icon name="add_task" />
                    </template>
                </q-select>

                <q-input outlined class="p-2" :dark="isDarkTheme" v-model="check_message" type="textarea"
                    label="Комментарий" lazy-rules />

            </div>


            <div class="flex justify-center mt-2">
                <q-btn @click="addCheck" label="Изменить статус заявки" type="button" color="primary" />
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped></style>