<script setup lang="ts">
import { classDarkTheme } from '../services/DarkTheme'
import { showNotif } from "../services/Notify"
import { setAdmin } from '../services/user.service'
import { getToken } from '~/services/auth.service';

useSeoMeta({
    title: 'Назначить администраторов',
})
definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'super-admin'],
})

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)


const model = ref(null)
const $q = useQuasar()

const is_admin = ref(false);
const toggle_disable = ref(false);

const config = useRuntimeConfig()
const users = ref([]);
const options = ref([]);
try {
    const fetchedUsers = await $fetch(`/users`, {
        baseURL: config.public.apiBase,
        headers: {
            'x-access-token': getToken(),
        },
    });

    is_admin.value = true;

    fetchedUsers.forEach(user => {
        const userOption = { id: user.id, label: `${user.surname} ${user.name} ${user.patronymic}`, is_admin: Boolean(user.is_admin) };
        options.value.push(userOption);
        users.value.push(userOption);
    });

} catch (error) {
    console.error(error);
    users.value = [];
    is_admin.value = false;
}

const filterFn = (val, update, abort) => {
    update(() => {
        const needle = val.toLowerCase();
        const filteredOptions = users.value.filter(option => {
            return option.label.toLowerCase().indexOf(needle) > -1;
        });
        options.value = filteredOptions;
    });
};


const onSetUserAdmin = () => {
    toggle_disable.value = true
    setAdmin(model)
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

        <div class="text-[#1f2731] dark:text-[#fff]" v-if="!is_admin">
            У вас нет доступа к этому контенту.
        </div>
        <div v-else :class="classDarkTheme" class="rounded-lg p-3 mb-3">

            <div class="text-h6 ms-2 text-[#1f2731] dark:text-[#fff]">Администраторы</div>

            <div class="flex justify-between mt-2 items-center">
                <q-select clearable clear-icon="close" class="flex-auto ms-2" :dark="isDarkTheme" outlined
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
            </div>
            <q-toggle v-if="model" v-model="model.is_admin" checked-icon="check" color="red"
                :label="model.is_admin ? 'Убрать права' : 'Назначить администратором'" size="xl" :dark="isDarkTheme"
                unchecked-icon="clear" :disable="toggle_disable" @click="onSetUserAdmin" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>