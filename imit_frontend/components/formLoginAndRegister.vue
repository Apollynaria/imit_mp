<script setup lang="ts">
import {classDarkTheme} from "../services/DarkTheme"

const props = defineProps({
    title: {
        type: String,
        default: "Title"
    },
    maxWidth: {
        type: String,
        default: "50%"
    },
    isLogin: {
        type: Boolean,
        default: true
    },
    sumbit_title: {
        type: String,
        default: 'Отправить'
    },
    loading:{
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['onSubmit']);

</script>

<template>
    <div class="w-full">
        <div class="flex justify-center flex-center z-10 relative h-full "
            :class="{ 'h-screen': isLogin, 'min-h-[700px]': !isLogin }">
            <q-card :style="$q.screen.lt.md ? { 'width': '85%' } : { 'width': maxWidth }"
                class="dark:bg-[#081626] bg-[#e2e2e2] text-[#1f2731] dark:text-[#fff] mt-[50px] mb-[50px]">
                <q-card-section>
                    <q-avatar size="103px" class="absolute-center shadow-10">
                        <img class="bg-[#142437]" src="../Logo-white.svg">
                    </q-avatar>
                </q-card-section>
                <div class="text-center mt-[40px]">
                    <div class="col text-h6 ellipsis">
                        Научные мероприятия ИМИТ ИГУ
                    </div>
                    <div class="col text-h6 ellipsis">
                        {{ title }}
                    </div>
                </div>
                <q-card-section>
                    <q-form class="q-gutter-md" @submit.prevent="emit('onSubmit')">

                        <div :class="classDarkTheme" class="rounded-lg p-3">
                            <slot name="form" />
                        </div>

                        <div>
                            <q-btn :loading="loading" :disable="loading" color="primary" type="submit">
                                {{ sumbit_title }}
                            </q-btn>
                        </div>
                        <slot name="buttons" />
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>