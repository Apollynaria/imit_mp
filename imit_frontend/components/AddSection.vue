<script setup lang="ts">
import { showNotif } from '~/services/Notify';
import { NOT_NULL_RULES } from "../services/DataRules"

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)
const config = useRuntimeConfig()
const is_admin = ref(false);
const toggle_disable = ref(false);
const options = ref([]);

const props = defineProps({
    users: {
        type: Array,
    },
});

const section = reactive({
    name: '',
    description: '',
    user_sections: [
        {
            id: props.users[0].id, label: props.users[0].label
        }
    ]
})

const model = ref(null)
const $q = useQuasar()

const addSection = ref()

const addSectionUser = () => {
    if (section.user_sections.at(-1) !== null) {
        section.user_sections.push({
            id: props.users[0].id, label: props.users[0].label
        })
    }
    else {
        showNotif("Чтобы добавить пользователя - заполните поле", 'red', $q)
    }
}

const deleteSectionUser = (ind) => {
    section.user_sections.splice(ind, 1);
}

const emit = defineEmits(['onSubmit']);

const onSubmitForm = () => {
    if (section.name === '') {
        showNotif("Чтобы добавить секцию - введите название", 'red', $q)
    }
    else {
        const uniqueUsers = section.user_sections.filter((user, index, self) =>
            index === self.findIndex((t) => (
                t.id === user.id
            ))
        );

        section.user_sections = uniqueUsers;

        const data = { ...section };
        emit('onSubmit', data);
        deleteData();

        addSection.value = false;
    }
}

const deleteData = () => {
    section.name = '';
    section.description = '';
    section.user_sections = [{
        id: props.users[0].id,
        label: props.users[0].label
    }];
};
</script>

<template>
    <div>

        <q-dialog v-model="addSection" :class="themeStore.getTheme">
            <q-card :dark="isDarkTheme" style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Создание секции</div>
                </q-card-section>

                <q-separator :dark="isDarkTheme" />

                <q-card-section style="max-height: 50vh " class="scroll">

                    <q-input :rules="NOT_NULL_RULES" clearable clear-icon="close" outlined class="p-2"
                        :dark="isDarkTheme" v-model="section.name" label="Название" lazy-rules>
                        <template v-slot:prepend>
                            <q-icon name="edit" />
                        </template>
                    </q-input>

                    <q-input clearable clear-icon="close" outlined class="p-2" :dark="isDarkTheme"
                        v-model="section.description" label="Описание" type="textarea" lazy-rules>
                    </q-input>

                    <div class="text-h6 p-2 text-[#1f2731] dark:text-[#fff]">Ответственные за секцию</div>

                    <div class="flex justify-between p-2 items-center">
                        <div class="flex justify-between p-2 items-center w-full"
                            v-for="(user, index) in section.user_sections" :key="index">
                            <q-select class="flex-auto" :dark="isDarkTheme" outlined
                                v-model="section.user_sections[index]" use-input fill-input hide-selected
                                input-debounce="0" label="Поиск по ФИО" :options="users">
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

                            <q-btn v-if="section.user_sections.length > 1" @click="deleteSectionUser(index)"
                                class="md:ms-2 md:mt-0 mt-2" size="12px" round color="grey-8" icon="close"
                                style="max-width: 12px; max-height: 12px;" />

                            <q-btn v-if="index === section.user_sections.length - 1" @click="addSectionUser"
                                class="md:ms-2 md:mt-0 mt-2" size="12px" round color="primary" icon="add"
                                style="max-width: 12px; max-height: 12px;" />

                        </div>
                    </div>


                </q-card-section>

                <q-separator :dark="isDarkTheme" />

                <q-card-actions align="right">
                    <q-btn label="Отменить" color="primary" @click="deleteData" v-close-popup />
                    <q-btn label="Создать" color="secondary" @click="onSubmitForm" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-btn class="ms-2 mt-2" @click="addSection = true" label="Добавить секцию" type="button" color="primary" />

    </div>
</template>

<style lang="scss" scoped></style>