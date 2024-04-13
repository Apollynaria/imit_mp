<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'
import { showNotif } from "../services/Notify"

useSeoMeta({
    title: 'Назначить администраторов',
})
definePageMeta({
    layout: 'admin'
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const stringOptions = [
    'Иванов Иван Иванович', 'Владиславов Владислав Владислвавович', 'Петров Денис Игоревич', 'Всем привет своим'
]
const options = ref(['Иванов Иван Иванович', 'Владиславов Владислав Владислвавович', 'Петров Денис Игоревич', 'Всем привет своим'])
const model = ref(null)
const filterFn = (val, update, abort) => {
    update(() => {
        const needle = val.toLowerCase()
        options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
    })
}

const $q = useQuasar()

const is_admin = ref(false);
const toggle_disable = ref(false);

const switchUserAdmin = () => {
    toggle_disable.value = true

    authStore.login(user)
        .then(() => {
            showNotif("Права пользователя изменены!", 'green', $q, 'done')
        })
        .catch(e => {
            console.log(e.response)
            showNotif(e.response._data.message, 'red', $q)
        })
        .finally(() => {
            toggle_disable.value = false
        })

}

</script>

<template>
    <div class="p-5">

        <div :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Администраторы</div>

            <div class="flex justify-between mt-2 items-center">
                <q-select clearable clear-icon="close" class="flex-auto ms-2" :dark="isDarkTheme" outlined v-model="model"
                    use-input fill-input hide-selected input-debounce="0" label="Поиск по ФИО" :options="options"
                    @filter="filterFn">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                Пользователь не найден
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>
            <q-toggle v-if="model" v-model="is_admin" checked-icon="check" color="red" :label="is_admin? 'Убрать права' : 'Назначить администратором'"
                size="xl" :dark="isDarkTheme" unchecked-icon="clear" :disable="toggle_disable" @click="switchUserAdmin" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>