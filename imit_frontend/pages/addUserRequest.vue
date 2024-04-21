<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'

useSeoMeta({
    title: 'Подать заявку',
})
definePageMeta({
    layout: 'admin'
})

const request = reactive({
    user_id: null,
    conference_id: null,
    section_id: null,
    name: '',
    comment: '',
    file_id: null
})

const sections = reactive([{
    id: 1,
    name: 'test'
}])

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

</script>

<template>
    <!-- <div class="text-[#1f2731] dark:text-[#fff] p-5" v-if="is_admin">
        У вас нет доступа к этому контенту.
    </div>
    <div v-else class="p-5"> -->
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Мероприятие</div>

            <q-input class="p-2" clearable clear-icon="close" outlined :dark="isDarkTheme" v-model="request.name"
                label="Название доклада" lazy-rules>
                <template v-slot:prepend>
                    <q-icon name="badge" />
                </template>
            </q-input>

            <div class="flex flex-col md:flex-row p-2">

                <q-select class="flex-1" :dark="isDarkTheme" outlined v-model="request.section_id" label="Секция"
                    :options="sections">
                    <template v-slot:prepend>
                        <q-icon name="badge" />
                    </template>
                </q-select>

                <q-file class="flex-1 md:ms-2 md:mt-0 mt-2" clearable clear-icon="close" :dark="isDarkTheme" outlined
                    v-model="request.file_id" label="Тезисы .tex .zip">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>

            </div>

            <q-input outlined class="p-2" :dark="isDarkTheme" v-model="request.comment" type="textarea"
                label="Комментарий" lazy-rules />

        </div>


        <div class="flex justify-center mt-2">
            <q-btn @click="" label="Создать заявку" type="button" color="primary" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>