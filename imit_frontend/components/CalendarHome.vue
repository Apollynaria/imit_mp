<script setup lang="ts">
import { setCssVar } from 'quasar'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const date = ref('2019/02/01');
const myLocale = reactive({
    days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
    monthsShort: 'Янв_Февр_Март_Апр_Май_Июнь_Июль_Авг_Сент_Окт_Нояб_Дек'.split('_'),
    firstDayOfWeek: 1,
    format24h: true,
    pluralDay: 'dias'
});
const events = ref(['2019/02/01', '2019/02/05', '2019/02/06'])

onMounted(() => {
    setCssVar('dark', '#142437')
});

</script>

<template>
    <div class="">
        <!-- <div class="text-center">
            <Icon class="text-[#1976D2]" name="material-symbols:calendar-month-outline" size="40" />
        </div> -->
        <div class="text-h4 text-center m-3 text-[#1f2731] dark:text-[#fff] font-semibold">
            Календарь мероприятий
        </div>
        <div class="q-pa-md flex flex-row justify-center w-95">
            <div class="mb-5">
                <q-date :dark="isDarkTheme" v-model="date" color="primary" :locale="myLocale" :events="events"
                    event-color="red" />
            </div>

            <div class="w-[600px] ms-5 mb-5  dark:text-[#fff]">
                <q-tab-panels class="dark:bg-[#142437] rounded border border-slate-300 dark:border-slate-600" v-model="date" animated transition-prev="jump-up"
                    transition-next="jump-up">
                    <q-tab-panel name="2019/02/02">
                        <div class="text-h5 q-mb-md font-semibold">Мероприятия на 01.02.2019</div>
                        <p>Мероприятия отсутствуют.</p>
                    </q-tab-panel>

                    <q-tab-panel name="2019/02/01">
                        <div class="text-h5 q-mb-md font-semibold">Мероприятия на 01.02.2019</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                            culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                            culpa fuga nulla ullam. In, libero.</p>
                    </q-tab-panel>

                    <q-tab-panel name="2019/02/05">
                        <div class="text-h5 q-mb-md font-semibold">Мероприятия на 05.02.2019</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                            culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                            culpa fuga nulla ullam. In, libero.</p>
                    </q-tab-panel>

                    <q-tab-panel name="2019/02/06">
                        <div class="text-h5 q-mb-md font-semibold">Мероприятия на 06.02.2019</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                            culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                            culpa fuga nulla ullam. In, libero.</p>
                    </q-tab-panel>
                </q-tab-panels>


            </div>
        </div>


    </div>
</template>

<style scoped></style>