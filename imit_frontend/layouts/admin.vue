<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const leftDrawerOpen = ref(false)
const router = useRouter()

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const logOut = () => {
    authStore.logout()
    router.push({ path: '/login' })
}

</script>

<template>
    <div :class="themeStore.getTheme">
        <q-layout view="lHh Lpr lFf" class="bg-[#e2e2e2] dark:bg-[#081626]">
            <q-header elevated>
                <q-toolbar class="bg-[#FBFAFC] dark:bg-[#142437] text-[#000] dark:text-[#fff]">
                    <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
                    <q-space />
                    <div class="q-gutter-sm row items-center no-wrap">
                        <q-btn round dense flat @click="themeStore.switchTheme"
                            :color="themeStore.getTheme == 'light' ? 'grey-9' : 'primary'"
                            :icon="themeStore.getTheme == 'light' ? 'dark_mode' : 'light_mode'" />
                        <q-btn round dense flat to='/profile'
                            :color="themeStore.getTheme == 'light' ? 'grey-9' : 'primary'" icon='person' />
                        <q-btn round dense flat @click="logOut"
                            :color="themeStore.getTheme == 'light' ? 'grey-9' : 'primary'" icon='logout' />
                    </div>
                </q-toolbar>
            </q-header>

            <q-drawer v-model="leftDrawerOpen" show-if-above
                class="shadow-[0_25px_20px_-15px_rgba(0,0,0,0.8)] bg-[#142437] text-[#fff]">
                <div class="flex justify-center mb-2">
                    <img src="../imit_nobackground.png" class="w-[100px] mt-3 circle" alt="">
                </div>
                <div class="text-h6 text-center text-[#fff] mb-2">
                    Научные мероприятия <br>ИМИТ ИГУ
                </div>
                <q-list>
                    <q-item clickable to='/profile' active-class="q-item-no-link-highlighting">
                        <q-item-section avatar>
                            <q-icon name="person" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>ПРОФИЛЬ</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-expansion-item icon="article" label="ЗАЯВКИ">
                        <q-list class="ms-[30px]">

                            <q-item clickable to="/conferencesRequest" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="add_circle" />
                                </q-item-section>
                                <q-item-section class="flex">
                                    <q-item-label>Подать заявку</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable to="/userRequests" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="checklist_rtl" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Мои заявки</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-expansion-item>

                    <q-expansion-item icon="settings" label="КОНФЕРЕНЦИИ" v-if="authStore.getUserIsAdminConference">
                        <q-list class="ms-[30px]">
                            <q-item clickable to="/setAdmins" active-class="q-item-no-link-highlighting"
                                v-if="authStore.getUserIsSuperAdmin">
                                <q-item-section avatar>
                                    <q-icon name="admin_panel_settings" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Администраторы</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable to="/addConference" v-if="authStore.getUserIsAdmin" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="add_circle" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Создать конференцию</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable to="/changeConference" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="change_circle" />
                                </q-item-section>
                                <q-item-section class="flex">
                                    <q-item-label>Конференции</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable to="/requests" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="checklist_rtl" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Заявки</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-expansion-item>

                </q-list>

                <q-item clickable to="/home" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="reply" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>НА ГЛАВНУЮ</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable type="button" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section @click="logOut">
                        <q-item-label>ВЫХОД</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/contacts" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="help" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>ПОДДЕРЖКА</q-item-label>
                    </q-item-section>
                </q-item>

            </q-drawer>

            <q-page-container>
                <NuxtPage class="h-full" />
            </q-page-container>
        </q-layout>
    </div>
</template>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
    animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
    0% {
        transform: scale(1);
    }

    5% {
        transform: scale(1.25);
    }

    20% {
        transform: scale(1);
    }

    30% {
        transform: scale(1);
    }

    35% {
        transform: scale(1.25);
    }

    50% {
        transform: scale(1);
    }

    55% {
        transform: scale(1.25);
    }

    70% {
        transform: scale(1);
    }
}
</style>