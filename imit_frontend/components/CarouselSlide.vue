<script setup lang="ts">

const props = defineProps({
    conf_id: {
        type: Number,
    },
    name: {
        type: String
    },
    img_src: {
        type: String,
        default: "https://cdn.quasar.dev/img/mountains.jpg"
    },
    title: {
        type: Object,
        default: "Title"
    },
    date: {
        type: String,
        default: "01.01.2001 - 01.01.2001"
    },
    date_request: {
        type: String,
    },
});

</script>



<template>
    <div>
        <q-carousel-slide :name="name" :img-src="img_src">
            <div class="absolute-top custom-caption">
                <div class="text-[40px] text-white text-bold m-2 flex justify-between items-end">
                    <q-btn :ripple="false" v-if="date_request" color="orange-9" class="h-[15px] pointer-events-none" size="13px" no-caps>
                        <q-icon left name="calendar_month" /> {{ date }}
                    </q-btn>
                    <q-btn :ripple="false" v-if="date_request" color="secondary" class="h-[15px] pointer-events-none" size="13px" >
                        Прием заявок: {{ date_request }}
                    </q-btn>
                </div>
            </div>
            <div class="absolute-bottom custom-caption bg-[#000] bg-opacity-50">
                <div class="text-[34px] text-white text-bold m-3 flex justify-between items-end">
                    {{ title }}
                </div>
                <div class="text-subtitle1 text-white m-3 flex justify-between items-center z-10">
                    <q-btn :to="`/conference/${conf_id}`" color="primary" size="15px" label="Подробнее" />
                    <q-btn color="purple" class="h-[15px]" size="15px" :to="`/addUserRequest?conference=${conf_id}`">
                        <Icon class="me-2" name="svg-spinners:pulse-2" color="white" size="20" />Идет регистрация
                    </q-btn>
                </div>
            </div>
        </q-carousel-slide>
    </div>
</template>

<style lang="scss" scoped></style>