<script setup lang="ts">

useSeoMeta({
  title: 'Главная',
})

const cards_prospects = ref([
  { title: 'Конференции', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'guidance:conference-room' },
  { title: 'Олимпиады', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'clarity:note-edit-line' },
  { title: 'Семинары', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'fluent:people-community-32-regular' },
])

const cards_mp = ref([
  { title: 'Мероприятие 1', description: 'Lorem ipsum dolor sit amet.', date: '12.05.2024' },
  { title: 'Мероприятие 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '15.05.2024' },
  { title: 'Мероприятие 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '17.05.2024' },
  { title: 'Мероприятие 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '19.05.2024' },
  { title: 'Мероприятие 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '21.05.2024' },
])

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

    <div class="bg-white">
      <Carousel class="w-90 mx-auto max-w-screen-xl"></Carousel>
    </div>

    <div class="bg-[#142437]">
      <div class="w-90 mx-auto max-w-screen-xl gap-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        <CardWithText v-for="(card, index) in cards_prospects" :key="index" :title="card.title" :text="card.text"
          :icon="card.icon">
        </CardWithText>
      </div>
    </div>

    <CalendarHome></CalendarHome>

    <div class="bg-[#142437]">
      <div class="w-90 mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardMp v-for="(card, index) in cards_mp" :key="index" :title="card.title" :description="card.description"
            :date="card.date">
          </CardMp>
        </div>

        <div class="flex justify-center p-2">
          <q-btn color="primary" label="Загрузить еще" />
        </div>

        <div class="flex justify-center ">
          <button
            class="text-[16px] mb-3 transition-all duration-400 pb-[1px] border-b border-transparent hover:border-white text-white"
            type="button">
            АРХИВ
          </button>
        </div>
    </div>

  </div>
</template>

<style scoped></style>