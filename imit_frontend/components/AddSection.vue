<script setup lang="ts">

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const section = reactive({
    name: '',
    description: ''
})

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

</script>

<template>
    <div>
        <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Секции</div>

        <q-dialog v-model="addSection" :class="themeStore.getTheme">
            <q-card :dark="isDarkTheme" style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Создание секции</div>
                </q-card-section>

                <q-separator :dark="isDarkTheme" />

                <q-card-section style="max-height: 50vh " class="scroll">

                    <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                        v-model="section.name" label="Название" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="edit" />
                        </template>
                    </q-input>

                    <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                        v-model="section.description" label="Описание" type="textarea" lazy-rules>
                    </q-input>

                    <div class="text-h6 p-2 text-[#1f2731] dark:text-[#fff]">Ответственные за секцию</div>

                    <div class="flex justify-between p-2 items-center">
                        <q-select clearable clear-icon="close" class="flex-auto" :dark="isDarkTheme" outlined
                            v-model="model" use-input fill-input hide-selected input-debounce="0" label="Поиск по ФИО"
                            :options="options" @filter="filterFn">
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

                        <q-btn class="md:ms-2 md:mt-0 mt-2" size="12px" round color="primary" icon="add"
                            style="max-width: 12px; max-height: 12px;" />
                    </div>


                </q-card-section>

                <q-separator :dark="isDarkTheme" />

                <q-card-actions align="right">
                    <q-btn label="Отменить" color="primary" v-close-popup />
                    <q-btn label="Создать" color="secondary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-btn class="ms-2 mt-2" @click="addSection = true" label="Добавить секцию" type="button" color="primary" />
    </div>
</template>

<style lang="scss" scoped></style>