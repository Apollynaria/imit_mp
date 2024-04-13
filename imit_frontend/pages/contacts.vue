<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'

useSeoMeta({
    title: 'Поддержка',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Контакты поддержки</div>

            <div class="flex flex-col md:flex-row p-2">

                <q-field outlined color="primary" class="flex-1" stack-label :dark="isDarkTheme" label="Разработчик"
                    lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                    <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">Дергунова Полина Павловна</div>
                    </template>
                </q-field>

                <q-field outlined color="primary" class="flex-1 md:ms-2 md:mt-0 mt-2" stack-label :dark="isDarkTheme" label="E-mail"
                    lazy-rules>
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                    <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">a.polly.narii@gmail.com</div>
                    </template>
                </q-field>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped></style>