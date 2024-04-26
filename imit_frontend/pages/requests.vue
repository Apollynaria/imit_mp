<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme';
import { getToken } from '~/services/auth.service';
import { getRequestTxT } from '../services/EnumRequests';

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



            <div v-for="(request, ind) in requests" @click="toRequest(request.id)" :key="ind" :class="classDarkTheme" class="rounded-lg p-2 mb-3">

                <q-card bordered flat :dark="isDarkTheme"
                    class="no-shadow transition-all duration-500 bg-inherit cursor-pointer hover:border-slate-300">
                    <q-card-section>
                        <q-card-section class="p-0">
                            <div class="flex flex-col md:flex-row justify-between">
                                <div class="text-[18px] q-mt-sm q-mb-xs">{{ request.conference.name }}</div>
                                <q-btn color="primary" outline
                                    class="pointer-events-none flex-end" :label="getRequestTxT(request.status)">
                                </q-btn>
                            </div>
                            <div class="text-[18px] q-mt-sm q-mb-xs">{{ request.user.surname }} {{ request.user.name }}
                                {{ request.user.patronymic }}</div>
                        </q-card-section>
                    </q-card-section>
                </q-card>

            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped></style>