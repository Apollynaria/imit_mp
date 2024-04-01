<script setup lang="ts">

useSeoMeta({
  title: 'Главная',
})

const cards_prospects = ref([
  { title: 'Конференции', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'guidance:conference-room' },
  { title: 'Олимпиады', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'clarity:note-edit-line' },
  { title: 'Семинары', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', icon: 'fluent:people-community-32-regular' },
])

</script>


<template>
  <div>
    <StarBackground>
      <Navbar></Navbar>
      <div class="h-[81%] flex flex-col items-center justify-center">
        <div class="flex justify-center mb-2">
          <img src="../imit_nobackground.png" class="w-[250px] transition-all duration-400 mt-3" alt="">
        </div>
        <div class="mb-2 text-[48px]">
          Научные мероприятия <br>
          ИМИТ ИГУ
        </div>
        <q-btn outline style="color: white;" size="15px" label="Подробнее" no-caps/>
      </div>
    </StarBackground>

    <div class="w-90 mx-auto max-w-screen-xl bg-white">
      <Carousel></Carousel>
      <div class="gap-1 columns-1 md:columns-3">
        <CardWithText v-for="(card, index) in cards_prospects" :key="index" :title="card.title" :text="card.text"
          :icon="card.icon">
        </CardWithText>
      </div>
      <CalendarHome></CalendarHome>

    </div>
  </div>
</template>

<style scoped></style>