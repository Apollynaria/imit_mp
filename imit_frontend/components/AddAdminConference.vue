<script setup lang="ts">

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const props = defineProps({
    title: {
        type: String,
        default: "Секретари организационного комитета"
    },
});

const addSection = ref()

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

const types = ['Председатель', 'Заместитель']
const type = ref(types[0])

</script>

<template>
    <div>
        <div class="text-h7 text-bold mt-2 text-[#1f2731] dark:text-[#fff]">Председатели</div>

        <div class="text-h7 text-bold mt-2 text-[#1f2731] dark:text-[#fff]">Заместители</div>

        <div class="flex justify-between mt-2 items-center">
            <q-select clearable clear-icon="close" class="flex-auto" :dark="isDarkTheme" outlined v-model="model"
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

            <q-select class="flex-auto md:ms-2 md:mt-0" :dark="isDarkTheme" outlined v-model="type"
                label="Роль" :options="types" style="max-width: 200px;">
            </q-select>

            <q-btn class="md:ms-2 md:mt-0 mt-2" size="12px" round color="primary" icon="add"
                style="max-width: 12px; max-height: 12px;" />
        </div>

    </div>
</template>

<style lang="scss" scoped></style>