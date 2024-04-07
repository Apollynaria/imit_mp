<script setup lang="ts">
import { reactive } from 'vue';


useSeoMeta({
    title: 'Личный кабинет',
})
definePageMeta({
    layout: 'admin'
})

const user_details = reactive({})

</script>

<template>
    <div>

        <div class="p-3">
            <q-input dark color="white" disabled dense v-model="user_details.user_name" label="Ваш логин" />
            <q-input dark color="white" dense v-model="user_details.first_name" label="Имя" />
            <q-input dark color="white" dense v-model="user_details.last_name" label="Фамилия" />
            <q-input dark color="white" dense v-model="user_details.patronymic" label="Отчество (при наличии)" />
        </div>

        <div class="p-3">
            <q-input dark color="white" disabled dense v-model="user_details.old_password" label="Ваш пароль" />
            <q-input dark color="white" type="password" dense v-model="user_details.new_password" label="Новый пароль" />
            <q-input dark color="white" type="password" dense v-model="user_details.new_password_again" label="Повторите новый пароль" />
            <q-btn label="Установить новый пароль" type="button" color="primary" />
        </div>

    </div>
</template>

<style lang="scss" scoped></style>