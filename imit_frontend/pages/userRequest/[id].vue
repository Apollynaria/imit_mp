<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { getToken } from '~/services/auth.service';
import { classDarkTheme } from '~/services/DarkTheme'
import { getFullDate } from '~/services/Date'
import { showNotif } from '~/services/Notify';
import { getRequestTxT } from '~/services/EnumRequests';
import { getColorFromStatus } from '~/services/Status';
import { serverLink } from '~/services/server';

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
const newFile = ref(null);

const addCheck = async () => {
    if (request.adminInfo.isAdminConference) {
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
    else {
        showNotif('Ошибка доступа', 'red', $q)
    }
}

const changeRequest = async () => {

    let formData = new FormData();

    formData.append('id', request.id);
    formData.append('comment', request.comment);

    if(newFile){
        formData.append('file', newFile);
    }

    try {
        const addedRequest = await $fetch(`/updateUserRequest`, {
            baseURL: config.public.apiBase,
            method: 'POST',
            body: formData,
            headers: {
                'x-access-token': getToken(),
            },
        });

        showNotif(addedRequest.message, 'green', $q);
        router.push({ path: `/userRequests` });

    } catch (error) {
        console.error(error);
        showNotif(error, 'red', $q)
    }

}

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <q-btn class="ms-2 mb-2 w-[149px] md:mx-0" @click="$router.back()" color="primary" icon="arrow_back_ios"
                    label="Назад" />
                <div class="text-h6 mb-2 text-[#1f2731] dark:text-[#fff] text-semibold text-center md:text-left">
                    Заявка пользователя
                </div>
                <q-btn class="ms-2 mb-2 w-[149px] md:mx-0 " :to="`/conference/${request.conference.id}`"
                    color="secondary" label="О мероприятии" />
            </div>

            <div class="flex justify-center mb-2">
                <q-btn :color=getColorFromStatus(request.status) outline class="pointer-events-none"
                    :label="getRequestTxT(request.status)" />
            </div>

            <div class="p-2 text-[#1f2731] dark:text-[#fff]">
                <div class="text-h6 text-semibold">Мероприятие: «{{ request.conference.name }}»</div>
                <div class="mt-2">
                    <a style="text-decoration: none;" download=""
                        :href="serverLink + request.file.path.substring(8)" target="_blank">
                        <q-btn color="primary" no-caps outline>
                            <q-icon left name="upload_file" />
                            <div>ТЕЗИСЫ</div>
                        </q-btn>
                    </a>
                </div>
                <q-file class="mt-4" lazy-rules clearable
                    v-if="request.status === 'revision' && !request?.adminInfo?.isAdminConference" clear-icon="close"
                    :dark="isDarkTheme" outlined v-model="newFile" label="Новые тезисы .tex .zip">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>
            </div>

            <q-input class="p-2" :readonly="request.status !== 'revision' || request?.adminInfo?.isAdminConference"
                outlined :dark="isDarkTheme" v-model="request.name" label="Название доклада" lazy-rules>
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
                    v-model="request.user.email" label="Email" lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
            </div>

            <q-select readonly class="p-2"
                :dark="isDarkTheme" outlined use-input fill-input hide-selected v-model="request.section.name"
                input-debounce="0" label="Секция" :options="options_sections">
                <template v-slot:prepend>
                    <q-icon name="grid_view" />
                </template>
            </q-select>

            <q-input :readonly="request.status !== 'revision' || request.adminInfo?.isAdminConference"
                v-if="request.comment" outlined class="p-2" :dark="isDarkTheme" v-model="request.comment"
                type="textarea" label="Комментарий" lazy-rules />

            <div v-if="request.status === 'revision' && !request.adminInfo?.isAdminConference"
                class="flex justify-center mt-2">
                <q-btn @click="changeRequest" label="Отправить изменения" type="button" color="primary" />
            </div>

        </div>


        <div>

            <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

                <div class="text-h6 ms-2 mb-2 text-[#1f2731] dark:text-[#fff]">История заявки</div>

                <div v-if="request.checks.length === 0">
                    <q-chat-message name="ВЫ"
                        avatar="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                        size="8" text-color="white" bg-color="secondary">
                        <div>
                            <q-btn flat class="pointer-events-none" color="white" icon="send" />
                            {{ 'Заявка отправлена!' }}
                        </div>
                    </q-chat-message>
                </div>

                <div v-for="(check, ind) in request.checks" :key="ind" class="w-full">
                    <q-chat-message name="ВЫ"
                        avatar="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                        size="8" text-color="white" bg-color="secondary">
                        <div>
                            <q-btn flat class="pointer-events-none" color="white"
                                :icon="ind === 0 ? 'send' : 'settings'" />
                            {{ ind === 0 ? 'Заявка отправлена!' : 'Заявка изменена!' }}
                        </div>
                    </q-chat-message>
                    <q-chat-message name="АДМИНИСТРАТОР" size="9" class="mb-2"
                        avatar="https://cdn-icons-png.flaticon.com/512/9703/9703596.png" sent text-color="white"
                        bg-color="primary" :stamp="'Новый статус заявки: ' + getRequestTxT(check.new_status)">
                        <div>
                            {{ check.message }}
                        </div>
                    </q-chat-message>
                </div>




            </div>

        </div>

        <div
            v-if="request.adminInfo?.isAdminConference && (request.status === 'consideration' || request.status === 'revision')">

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


                <div class="flex justify-center mt-2">
                    <q-btn @click="addCheck" label="Изменить статус заявки" type="button" color="primary" />
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped></style>