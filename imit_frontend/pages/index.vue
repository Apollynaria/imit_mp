<script setup lang="ts">
import { getFullDate } from '../services/Date'

useSeoMeta({
  title: 'Главная',
})

const cards_prospects = ref([
  { title: 'Конференции', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'groups', color: 'primary' },
  { title: 'Олимпиады', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'edit_note', color: 'purple' },
  { title: 'Семинары', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'connect_without_contact', color: 'secondary' },
])


// const cards_3 = ref([
//   { title: 'Мероприятие 1', short_description: 'Lorem ipsum dolor sit amet.', date: '12.05.2024 - 13.05.2024', date_request: '12.02.2023 - 23.05.2023', page_link: '/conference/1', register_link: '/addUserRequest?conference=2' },
//   { title: 'Мероприятие 2', short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '15.05.2024' },
//   { title: 'Мероприятие 3', short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '17.05.2024' },
// ])

const config = useRuntimeConfig();

const { pending, data: conferences } = await useAsyncData(
  'conferences',
  () => $fetch(`${config.public.apiBase}/conferences`, {})
);

console.log(conferences)

const cardsForCarousel = computed(() => conferences.value.slice(0, Math.min(3, conferences.value.length))); 

</script>


<template>
  <div>
    <StarBackground>

      <Navbar></Navbar>

      <div class="h-[81%] flex flex-col items-center justify-center">

        <div class="flex justify-center mb-2">
          <img src="../imit_nobackground.png" class="w-[200px] mt-3" alt="">
        </div>

        <div class="mb-2 text-[40px]">
          Научные мероприятия <br>
          ИМИТ ИГУ
        </div>

        <q-btn outline style="color: white;" size="15px" label="Подробнее" no-caps />

      </div>

    </StarBackground>

    <div class="w-90 mx-auto max-w-screen-xl">


      <Carousel :slides="cardsForCarousel"></Carousel>


      <div class="gap-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        <!-- <div class="gap-1 grid grid-cols-1"> -->
        <CardWithText v-for="(card, index) in cards_prospects" :key="index" :title="card.title" :text="card.text"
          :icon="card.icon" :color="card.color">
        </CardWithText>
      </div>

      <CalendarHome class="m-3"></CalendarHome>


      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardMp v-for="(conference, index) in conferences" :key="index" :border="true" :title="conference.name"
          :short_description="conference.short_description"
          :date="getFullDate(conference.date_begin, conference.date_end)"
          :date_request="getFullDate(conference.date_for_request_begin, conference.date_for_request_end)"
          :page_link="`/conference/${conference.id}`" :register_link="`/addUserRequest?conference=${conference.id}`"
          :file="`http://localhost:3000/` + conference.title_file.path.substring(8)">
        </CardMp>
      </div>

      <div class="flex justify-center p-2">
        <q-btn color="primary" label="Загрузить еще" />
      </div>

      <div class="flex justify-center ">
        <button
          class="text-[16px] mb-3 transition-all duration-400 pb-[1px] border-b border-transparent hover:border-[#000] text-[#000] dark:hover:border-[#fff] dark:text-[#fff]"
          type="button">
          АРХИВ
        </button>
      </div>
    </div>

  </div>

</template>

<style scoped></style>