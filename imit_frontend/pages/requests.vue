<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme';
import { getToken } from '~/services/auth.service';
import { getRequestTxT } from '../services/EnumRequests';
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

const toRequest = (id) => {
    router.push({ path: `/userRequest/${id}` });
}

</script>

<template>
    <div class="p-5">

        <div class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 mb-2 text-[#1f2731] dark:text-[#fff]">Заявки пользователей</div>


            <q-card bordered :dark="isDarkTheme" v-for="(request, ind) in requests" :key="ind"
                @click="toRequest(request.id)"
                class="bg-[#fff] dark:bg-[#142437] cursor-pointer p-1 mb-4">
                <q-card-section>
                    <q-card-section class="p-0">
                        <div class="flex flex-col md:flex-row justify-between">
                            <div class="text-[20px] text-[500]">{{ request.conference.name }}</div>
                            <q-btn :color=getColorFromStatus(request.status) outline class="flex-end"
                                :label="getRequestTxT(request.status)" />
                        </div>
                        <div class="text-[16px] text-normal">Секция: {{ request.section.name }}</div>
                        <q-separator :dark="isDarkTheme" class="my-2"/>
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