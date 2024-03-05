<template>
  <header class="bg-white w-full transition-all duration-500 ease-in-out text-black">
    <nav class="flex flex-row justify-between p-3 transition-all duration-500 w-90 mx-auto max-w-screen-lg">
      <div class="flex items-center">
        <img src="../imit.png" class="w-[70px] transition-all duration-500" alt="">
        <div v-if="!mobile" class="ms-2 pointer-events-none mt-[6px] font-medium">НАУЧНЫЕ МЕРОПРИЯТИЯ ИМИТ ИГУ</div>
      </div>
      <ul v-if="!mobile" class="flex items-center flex-1 justify-end font-medium text-black list-none no-underline">
        <li v-for="url in urls_text" :key="url.name" class="p-3 ml-4">
          <nuxt-link
            class="text-[16px] transition-all duration-500 pb-1 border-b border-transparent hover:text-blue-900 hover:border-blue-900"
            :to="url.name">
            {{ url.text }}
          </nuxt-link>
        </li>
        <li v-for="url in urls_icon" :key="url.name" class="ml-4">
          <UTooltip :text=url.tooltip>
            <nuxt-link
              class="text-[16px] transition-all duration-500 pb-1 border-b border-transparent hover:text-blue-900 hover:border-blue-900"
              :to="url.name">
              <Icon :name="url.icon" size="20" />
            </nuxt-link>
          </UTooltip>
        </li>
      </ul>
      <div class="flex items-center top-0 right-[24px]">
        <Icon class="bar" @click="toggleMobileNav" v-show="mobile" name="iconamoon:menu-burger-horizontal-bold" size="30" />
      </div>
      <transition name="mobile-nav">
        <ul v-if="mobileNav" class="flex flex-col fixed w-full max-w-[250px] h-full bg-gray-900 top-0 left-0 z-40"
          v-on-click-outside="closeNav">
          <div class="text-[18px] m-3 text-white">Научные мероприятия ИМИТ ИГУ</div>
          <hr class="h-px my-2 bg-gray-700 border-0">
          <li v-for="url in urls_mobile" :key="url.name" class="m-3">
            <nuxt-link
              class="text-[18px] transition-all duration-500 pb-1 border-b border-transparent hover:text-blue-300 hover:border-blue-300 text-white"
              :to="url.name">
              <Icon :name="url.icon" size="20" /> {{ url.text }}
            </nuxt-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';

const mobile = ref(false);
const mobileNav = ref(false);
const windowWidth = ref();

const urls_text = ref([
  { name: '/home', text: 'Конференции', icon: 'material-symbols-light:jamboard-kiosk' },
  { name: '/home', text: 'Семинары', icon: 'material-symbols:speaker-notes-outline' },
  { name: '/home', text: 'Олимпиады', icon: 'material-symbols:edit-note-outline' },
])

const urls_icon = ref([
  { name: '/home', text: '', icon: 'mdi:telegram', tooltip: 'Подписаться'},
  { name: '/home', text: '', icon: 'mdi:import', tooltip: 'Войти'},
])

const urls_mobile = ref([
  { name: '/home', text: 'Конференции', icon: 'material-symbols-light:jamboard-kiosk' },
  { name: '/home', text: 'Семинары', icon: 'material-symbols:speaker-notes-outline' },
  { name: '/home', text: 'Олимпиады', icon: 'material-symbols:edit-note-outline' },
  { name: '/home', text: 'Подписаться', icon: 'mdi:telegram'},
  { name: '/home', text: 'Войти', icon: 'mdi:import'},
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

<style>
header {

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
}
</style>