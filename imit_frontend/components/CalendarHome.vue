<script setup lang="ts">
import { setCssVar } from 'quasar'
import { useThemeStore } from '@/stores/theme';
import { myLocale } from '~/services/Date';
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const date = ref('2019/02/01');
const events = ref(['2019/02/01', '2019/02/05', '2019/02/06'])

onMounted(() => {
    setCssVar('dark', '#142437')
});

const classLogo = computed(() => {
    return {
        'bg-[#142437]': (isDarkTheme.value === true),
        'bg-[#fff]': (isDarkTheme.value === false)
    }

})

</script>

<template>
    <div :class="classLogo" class="rounded-lg p-3">
        <!-- <div class="text-center">
            <Icon class="text-[#1976D2]" name="material-symbols:calendar-month-outline" size="40" />
        </div> -->
        <div class="text-h4 text-center m-3 text-[#1f2731] dark:text-[#fff] font-medium">
            Календарь мероприятий
        </div>
        <div class="q-pa-md flex flex-row justify-center w-95">
            <div class="mb-5">
                <q-date bordered class="no-shadow" :dark="isDarkTheme" v-model="date" color="primary" :locale="myLocale" :events="events"
                    event-color="red" />
            </div>

            <div class="w-[600px] ms-5 mb-5  dark:text-[#fff]">
                <q-card bordered :dark="isDarkTheme" class="no-shadow">
                    <q-tab-panels class="dark:bg-[#142437] rounded " v-model="date" animated transition-prev="jump-up"
                        transition-next="jump-up">

                        <!-- Вот это брать -->
                        <q-tab-panel dark name="2019/02/02">
                            <div class="text-h5 q-mb-md text-secondary text-bold">Мероприятия на 01.02.2019</div>
                            <p>Мероприятия отсутствуют.</p>
                        </q-tab-panel>

                        <q-tab-panel name="2019/02/01">
                            <div class="text-h5 q-mb-md">Мероприятия на 01.02.2019</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>

                    </q-tab-panels>
                </q-card>

            </div>
        </div>


    </div>
</template>

<style scoped></style>