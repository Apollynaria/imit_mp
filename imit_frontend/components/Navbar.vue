<script setup lang="ts">

import { vOnClickOutside } from '@vueuse/components';

const mobile = ref(false);
const mobileNav = ref(false);
const windowWidth = ref();

const urls_text = ref([
    { name: '/home', text: 'ГЛАВНАЯ', icon: 'material-symbols-light:jamboard-kiosk' },
    { name: '/conferences', text: 'КОНФЕРЕНЦИИ', icon: 'material-symbols-light:jamboard-kiosk' },
    { name: '/conferences', text: 'ОЛИМПИАДЫ', icon: 'material-symbols-light:jamboard-kiosk' },
    { name: '/conferences', text: 'СЕМИНАРЫ', icon: 'material-symbols-light:jamboard-kiosk' },])

const urls_icon = ref([
    { name: 'https://t.me/webimit_bot', text: '', icon: 'mdi:telegram', tooltip: 'Подписаться' },
    { name: '/login', text: '', icon: 'mdi:import', tooltip: 'Войти' },
])

const urls_mobile = ref([
    { name: '/home', text: 'Главная', icon: 'material-symbols-light:jamboard-kiosk' },
    { name: '/home', text: 'Конференции', icon: 'material-symbols-light:jamboard-kiosk' },
    { name: '/home', text: 'Подписаться', icon: 'mdi:telegram' },
    { name: 'https://t.me/webimit_bot', text: 'Войти', icon: 'mdi:import' },
])



const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
};

const closeNav = (event) => {
    const clickedOnIcon = event.target.closest('.bar');
    if (!clickedOnIcon) {
        mobileNav.value = false;
    }
};

const checkScreen = () => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value <= 750) {
        mobile.value = true;
        return;
    }
    mobile.value = false;
    mobileNav.value = false;
};

onBeforeMount(() => {
    window.addEventListener('resize', checkScreen);
    checkScreen();
});

</script>

<template>
    <nav class="flex flex-row justify-between p-3 transition-all duration-400 w-90 h-[15%] mx-auto max-w-screen-lg">
        <!-- not mobile -->
        <ul v-if="!mobile"
            class="flex items-center flex-1 justify-center font-medium text-white list-none no-underline">
            <!-- default menu -->
            <li v-for="url in urls_text" :key="url.name" class="p-3 ml-4">
                <nuxt-link class="text-[16px] transition-all duration-400 pb-1 hover:text-gray-500" :to="url.name">
                    {{ url.text }}
                </nuxt-link>
            </li>
            <!-- menu with tooltip -->
            <li v-for="url in urls_icon" :key="url.name" class="ml-4">
                <nuxt-link class="text-[16px] text-[#fff] transition-all duration-400 pb-1 hover:text-gray-500"
                    :to="url.name">
                    <Icon :name="url.icon" size="20" />
                    <q-tooltip class="text-[#000] text-[12px] bg-[#fff] font-medium">{{ url.tooltip }}</q-tooltip>
                </nuxt-link>
            </li>
        </ul>
        <!-- mobile -->
        <ul v-else class="flex items-end justify-end font-medium w-full text-white list-none no-underline">
            <li class=" me-[45px] mb-[30px]">
                <Icon class="bar pb-1 transition-all duration-400 pb-1" @click="toggleMobileNav" v-show="mobile"
                    :name="mobileNav ? 'ic:sharp-close' : 'iconamoon:menu-burger-horizontal-bold'" size="40" />
            </li>
        </ul>
        <transition name="mobile-nav">
            <ul v-if="mobileNav" class="flex flex-col fixed w-full max-w-[250px] h-full bg-gray-900 top-0 left-0 z-40"
                v-on-click-outside="closeNav">
                <div class="text-[18px] m-5 text-left text-white">Научные мероприятия ИМИТ ИГУ</div>
                <hr class="h-px bg-gray-700 border-0">
                <li v-for="url in urls_mobile" :key="url.name" class="flex justify-start m-5">
                    <nuxt-link
                        class="text-[18px] transition-all duration-400 pb-1 border-b border-transparent hover:text-gray-300 hover:border-gray-300 text-white"
                        :to="url.name">
                        <Icon :name="url.icon" size="20" /> {{ url.text }}
                    </nuxt-link>
                </li>
            </ul>
        </transition>
    </nav>

    <div v-if="!mobile" class="h-[2%]">
        <hr class="w-[400px] h-[0.2px] m-auto bg-gray-100 border-0 rounded mt-4">
    </div>
</template>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
    transition: all 0.3s;
}

.rotate-enter-from,
.rotate-leave-to {
    opacity: 0;
    transform: rotate3d(1, 1, 1, -15deg);
}

nav {

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: .5s ease all
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }
}
</style>