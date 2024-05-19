<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const cards_mp = ref([
    { title: 'Конференция 1', description: 'Lorem ipsum dolor sit amet.', date: '12.05.2024' },
    { title: 'Конференция 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '15.05.2024' },
    { title: 'Конференция 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '17.05.2024' },
    { title: 'Конференция 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '19.05.2024' },
    { title: 'Конференция 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '21.05.2024' },
])

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }

})

</script>

<template>
    <div>
        <StarBackground>
            <Navbar></Navbar>
            <div class="h-[83%] flex flex-col items-center justify-center">

                <div class="flex justify-center mb-2">
                    <img src="../imit_nobackground.png" class="w-[200px] transition-all duration-400 mt-3" alt="">
                </div>

                <div class="mb-2 text-[40px]">
                    Конференции ИМИТ ИГУ
                </div>

                <q-btn outline style="color: white;" size="15px" label="Подробнее" no-caps />

            </div>
        </StarBackground>


        <div class="w-90 mx-auto max-w-screen-xl bg-[#fff] dark:bg-inherit">

            <div class="rounded-lg p-3 m-3">
                <div class="text-h4 text-center text-[#1f2731] dark:text-[#fff] font-medium mb-2">
                    Научные конференции
                </div>

                <div class="flex flex-row justify-center mb-2">

                    <img class="w-[600px] p-3" src="../VbwjenOX4WA.jpg">

                    <div class="w-[600px] text-h6 text-[#1f2731] dark:text-[#fff] p-3 content-center">
                        <q-card :dark="isDarkTheme" bordered
                            class="bg-[#fff] dark:bg-[#142437] text-[#000] dark:text-[#fff] my-card no-shadow">

                            <q-card-section>
                                Участие в конференции дает возможность узнать о новых идеях и подходах в близких вам темах, а также расширить свое представление о смежных областях, глубже понять проблемы, обогатиться новыми фактами и аналитикой, зарядиться атмосферой профессионального сообщества.
                                Чтобы не пропустить ничего ценного, нужна подготовка. Полезно заранее изучить программу. Желательно подготовить предметные вопросы по интересующим вас темам и задать их в зале или после, в перерыве. Это, кстати, хороший повод познакомиться со спикером лично.
                            </q-card-section>

                            

                        </q-card>
                    </div>
                </div>
            </div>


            <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardMp v-for="(card, index) in cards_mp" :key="index" :title="card.title"
                    :description="card.description" :date="card.date">
                </CardMp>
            </div> -->

            <!-- <div class="flex justify-center p-2">
                <q-btn color="primary" label="Загрузить еще" />
            </div>

            <div class="flex justify-center mb-2">
                <button-underline title="АРХИВ" link="/archive" />
            </div> -->


            <div class="flex justify-center flex-col md:flex-row text-[#1f2731] dark:text-[#fff]">
                <div class="rounded-lg p-3 w-full md:w-[75%] md:max-w-[800px]">
                    <div class="text-h4 text-center text-[#1f2731] dark:text-[#fff] font-medium mb-2">
                        Как подать заявку?
                    </div>

                    <div class="rounded-xl flex flex-col lg:flex-row justify-center items-center mt-5"
                        :class="classLogo">
                        <div class="w-[300px]">
                            <img class="p-3" src="../image1.png" alt="Step 1">
                        </div>
                        <div class="text-[120px] text-primary ">1</div>
                        <div class="md:w-[350px] text-center mb-5">
                            <div class="text-h4 text-bold text-primary mb-2">Подача заявки</div>
                            <div class="text-balance">
                               Зарегистрируйтесь в личном кабинете и нажмите вкладку Заявки. Выберите конференцию и заполните все поля.
                            </div>
                        </div>
                    </div>

                    <div class="rounded-xl flex flex-col lg:flex-row justify-center items-center mt-5"
                        :class="classLogo">
                        <div class="text-[120px] text-purple ">2</div>
                        <div class="md:w-[350px] text-center mb-5">
                            <div class="text-h4 text-bold text-purple mb-2">Тезисы и статус заявки</div>
                            <div class="text-balance">
                                Загрузите тезисы на мероприятие. Обратите внимание, что тезисы проверяет оргкомитет конференции.
                                Отслеживать статус своей заявки можно в личном кабинете.
                            </div>
                        </div>
                        <div class="w-[300px]">
                            <img class="p-3" src="../image2.png" alt="Step 1">
                        </div>
                    </div>

                    <div class="rounded-xl flex flex-col lg:flex-row justify-center items-center mt-5"
                        :class="classLogo">
                        <div class="w-[300px]">
                            <img class="p-3" src="../image3.png" alt="Step 1">
                        </div>
                        <div class="text-[120px] text-secondary ">3</div>
                        <div class="md:w-[350px] text-center mb-5">
                            <div class="text-h4 text-bold text-secondary mb-2">Порядок выступления</div>
                            <div class="text-balance">
                                Через несколько дней на странице мероприятия появится порядок выступления.
                                Вы можете найти свой доклад там, если он был принят администраторами.
                            </div>
                        </div>
                    </div>

                    <div class="rounded-xl flex flex-col lg:flex-row justify-center items-center mt-5"
                        :class="classLogo">
                        <div class="text-[120px] text-orange ">4</div>
                        <div class="md:w-[350px] text-center mb-5">
                            <div class="text-h4 text-bold text-orange mb-2">Конференция</div>
                            <div class="text-balance">
                                Приходите на конференцию в назначенный день. Просьба не опаздывать!
                            </div>
                        </div>
                        <div class="w-[300px]">
                            <img class="p-3" src="../image4.png" alt="Step 1">
                        </div>
                    </div>

                </div>
            </div>


        </div>

    </div>
</template>

<style></style>