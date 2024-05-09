<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme';
import { getToken } from '~/services/auth.service';
import { getRequestTxT, getEnumKeyFromText } from '../services/EnumRequests';
import { getColorFromStatus } from '../services/Status';

useSeoMeta({
    title: 'Все заявки',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const config = useRuntimeConfig()

const requests = await $fetch(`/requests`, {
    baseURL: config.public.apiBase,
    headers: {
        'x-access-token': getToken(),
    },
});

const router = useRouter()
console.log(requests);


const filteredRequests = computed(() => {
    if (modelStatusFilter.value.length === 0) {
        return requests;
    }
    return requests.filter(request => {
        return modelStatusFilter.value.some(filterValue => { 
            const filterEnum = getEnumKeyFromText(filterValue);
            return request.status === filterEnum;
        });
    });
});

const toRequest = (id) => {
    router.push({ path: `/userRequest/${id}` });
}

const statusFilterOptions = [
    'На рассмотрении', 'На доработке', 'Принято', 'Принято после доработки', 'Принято, изменена секция', 'Отмена'
]

const modelStatusFilter = ref([])

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }

})
</script>

<template>
    <div class="p-5">

        <div class="rounded-lg p-3 mb-3">

            <div class="rounded p-3 mb-5" :class="classLogo">
                <div class="text-h6 text-[#1f2731] dark:text-[#fff] mb-3">Заявки пользователей</div>

                <q-select :dark="isDarkTheme" class="" outlined v-model="modelStatusFilter" multiple
                    :options="statusFilterOptions" use-chips stack-label label="Статус заявки" />
            </div>


            <q-card bordered :dark="isDarkTheme" v-for="(request, ind) in filteredRequests" :key="ind"
                @click="toRequest(request.id)"
                class="bg-[#fff] dark:bg-[#142437] cursor-pointer p-1 mb-4 border-l-4 border-t-0 border-r-0 border-b-0 border-sky-600">
                <q-card-section>
                    <q-card-section class="p-0">
                        <div class="flex flex-col md:flex-row justify-between">
                            <div class="text-[20px] text-[500]">{{ request.conference.name }}</div>
                            <q-btn :color=getColorFromStatus(request.status) outline class="flex-end"
                                :label="getRequestTxT(request.status)" />
                        </div>
                        <div class="text-[16px] text-normal">Секция: {{ request.section.name }}</div>
                        <q-separator :dark="isDarkTheme" class="my-2" />
                        <div class="text-[16px] text-normal">{{ request.name }}</div>
                        <div class="text-[16px] text-normal">{{ request.user.surname }} {{ request.user.name }}
                            {{ request.user.patronymic }}</div>
                    </q-card-section>
                </q-card-section>
            </q-card>

        </div>
    </div>
</template>

<style lang="scss" scoped></style>