<template>
    <div :class="themeStore.getTheme">
        <q-layout view="lHh Lpr lFf" class="bg-[#e2e2e2] dark:bg-[#081626]">
            <q-header elevated>
                <q-toolbar class="bg-[#FBFAFC] dark:bg-[#142437] text-[#000] dark:text-[#fff]">
                    <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
                    <q-toolbar-title>
                        Личный кабинет
                    </q-toolbar-title>
                    <q-space />
                    <div class="q-gutter-sm row items-center no-wrap">
                        <q-btn round dense flat @click="themeStore.switchTheme"
                            :color="themeStore.getTheme == 'light' ? 'grey-9' : 'primary'"
                            :icon="themeStore.getTheme == 'light' ? 'dark_mode' : 'light_mode'" />
                        <q-btn round dense flat :color="themeStore.getTheme == 'light' ? 'grey-9' : 'primary'"
                            icon="notifications">
                            <!-- <q-badge color="red" text-color="white" floating>
                                5
                            </q-badge> -->
                            <q-menu>
                                <q-list style="min-width: 100px">
                                    <messages></messages>
                                    <q-card class="text-center no-shadow no-border">
                                        <q-btn label="View All" style="max-width: 120px !important;" flat dense
                                            class="text-indigo-8"></q-btn>
                                    </q-card>
                                </q-list>
                            </q-menu>
                        </q-btn>
                        <q-btn round dense flat to="/profile"
                            :color="themeStore.getTheme == 'light' ? 'grey-9' : 'primary'" icon='person' />
                    </div>
                </q-toolbar>
            </q-header>

            <q-drawer v-model="leftDrawerOpen" show-if-above
                class="shadow-[0_25px_20px_-15px_rgba(0,0,0,0.8)] bg-[#142437] text-[#fff]">
                <div class="flex justify-center mb-2">
                    <img src="../imit_nobackground.png" class="w-[100px] mt-3 circle"
                        alt="">
                </div>
                <div class="text-h6 text-center text-[#fff] mb-2">
                    Научные мероприятия <br>ИМИТ ИГУ
                </div>
                <q-list>
                    <q-item to="/profile" active-class="q-item-no-link-highlighting">
                        <q-item-section avatar>
                            <q-icon name="person" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>ПРОФИЛЬ</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item to="/profile" active-class="q-item-no-link-highlighting">
                        <q-item-section avatar>
                            <q-icon name="article" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>ЗАЯВКИ НА МЕРОПРИЯТИЯ</q-item-label>
                        </q-item-section>
                    </q-item>

                    <!-- <q-expansion-item icon="pages" label="Pages">
                        <q-list class="q-pl-lg">
                            <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="email" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Login-1</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="list" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Pricing</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item-label header
                                class="text-weight-bolder text-[#000] dark:text-[#fff]">Generic</q-item-label>
                            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="person" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>User Profile</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item to="/Maintenance" active-class="q-item-no-link-highlighting">
                                <q-item-section avatar>
                                    <q-icon name="settings" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Maintenance</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-expansion-item> -->

                </q-list>

                <q-item to="/home" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="reply" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>НА ГЛАВНУЮ</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item to="/login" active-class="q-item-no-link-highlighting">
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>ВЫХОД</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item to="/help" active-class="q-item-no-link-highlighting">
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

<script setup lang="ts">
import Messages from "./Messages.vue";
// import * as Logo from "../public/Logo.svg"
import { defineComponent, ref } from 'vue'
import { useQuasar } from "quasar";
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()


const leftDrawerOpen = ref(false)
const $q = useQuasar()
console.log($q.fullscreen?.isActive)


const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

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