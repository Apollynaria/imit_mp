<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { getDateString } from '~/services/Date';
import { getToken } from '~/services/auth.service';

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }
})

const config = useRuntimeConfig()
const route = useRoute();
const requestId = route.params.id;

const request = await $fetch(`/conference/${requestId}`, {
    baseURL: config.public.apiBase,
    headers: {
        'x-access-token': getToken(),
    },
});

</script>

<template>
    <div class="p-5">

        <div class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 mb-2 text-[#1f2731] dark:text-[#fff]">Заявки пользователей</div>



            <!-- <div :class="classDarkTheme" class="rounded-lg p-2 mb-3"> -->

            <!-- <q-card bordered flat :dark="isDarkTheme"
            class="no-shadow transition-all duration-500 bg-inherit cursor-pointer hover:border-slate-300">
            <q-card-section>
                <q-card-section class="p-0">
                    <div class="flex flex-col md:flex-row justify-between">
                        <div class="text-[18px] q-mt-sm q-mb-xs">{{ request.conference.name }}</div>
                        <q-btn color="primary" outline class="pointer-events-none flex-end"
                            :label="getRequestTxT(request.status)" />
                            
                    </div>
                    <div class="text-[18px] q-mt-sm q-mb-xs">{{ request.user.surname }} {{ request.user.name }} {{ request.user.patronymic }}</div>

                </q-card-section>
            </q-card-section>

        </q-card> -->

            <!-- </div> -->

        </div>
    </div>
</template>

<style>
.w-fulls {
    width: 100% !important;
}
</style>