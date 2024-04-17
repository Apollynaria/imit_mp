<script setup lang="ts">
import { showNotif } from '~/services/Notify';
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const props = defineProps({
    title: {
        type: String,
        default: "Секретари организационного комитета"
    },
    users: {
        type: Array,
    },
});

const addSection = ref()
const types = ['Председатель', 'Заместитель']
const type = ref(types[0])

const secretary = ref(props.users[0]);

const emit = defineEmits(['onSubmit']);
const $q = useQuasar()

const addSecretary = () => {
    if (secretary.value !== null) {
        const data = {
            ...secretary.value,
            type: type.value
        };
        emit('onSubmit', data);

        // secretary.value = props.users[0];
        // type.value = types[0];
    }
    else {
        showNotif("Чтобы добавить пользователя - заполните поле", 'red', $q)
    }
}

</script>

<template>
    <div>
        <div class="flex justify-between mt-2 items-center">
            <q-select class="flex-auto" :dark="isDarkTheme" outlined v-model="secretary" use-input fill-input
                hide-selected input-debounce="0" label="Поиск по ФИО" :options="users">
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

            <q-select class="flex-auto md:ms-2 md:mt-0" :dark="isDarkTheme" outlined v-model="type" label="Роль"
                :options="types" style="max-width: 200px;">
            </q-select>

            <q-btn class="md:ms-2 md:mt-0 mt-2" size="12px" @click="addSecretary" round color="primary" icon="add"
                style="max-width: 12px; max-height: 12px;" />
        </div>

    </div>
</template>

<style lang="scss" scoped></style>