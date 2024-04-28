<script setup lang="ts">
import { getToken } from '~/services/auth.service';
import { classDarkTheme } from '../services/DarkTheme'
import { getFullDate } from '../services/Date';
import { getRequestTxT } from '../services/EnumRequests';
import { getColorFromStatus } from '../services/Status';

useSeoMeta({
    title: 'Заявки пользователя',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const config = useRuntimeConfig()

const requests = await $fetch(`/userRequests`, {
    baseURL: config.public.apiBase,
    headers: {
        'x-access-token': getToken(),
    },
});

console.log(requests);

const router = useRouter();
const toRequest = (id) => {
    router.push({ path: `/userRequest/${id}` });
}

</script>

<template>
    <div class="p-5">

        <div class="rounded-lg p-3 mb-3">

            <div v-if="requests.length > 0" class="text-h6 ms-2 mb-2 text-[#1f2731] dark:text-[#fff]">Ваши заявки</div>
            <div v-else class="text-h6 ms-2 mb-2 text-[#1f2731] dark:text-[#fff]">
                Список ваших заявок пуст
                <q-btn to="/conferencesRequest" color="primary" class="ms-2 q-mt-sm q-mb-xs"
                    label="Подать заявку" />
            </div>


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
                        <div class="text-[16px] text-normal">Доклад: {{ request.name }}</div>
                    </q-card-section>
                </q-card-section>
            </q-card>

        </div>
    </div>
</template>

<style lang="scss" scoped></style>