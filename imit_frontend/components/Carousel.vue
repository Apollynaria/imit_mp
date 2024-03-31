<script setup lang="ts">
const slide = ref(1);
const autoplay = ref(true);
</script>


<template>
    <div class="q-pa-md">
        <q-carousel
            animated
            v-model="slide"
            infinite
            navigation
            navigation-position="top"
            :autoplay="autoplay"
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
            >
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg">
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2 text-white text-bold m-3 flex justify-between items-end">
                        Конференция
                        <q-btn color="secondary" class="h-[15px]" size="15px" no-caps>
                            Идет регистрация<Icon class="ms-2" name="svg-spinners:3-dots-scale-middle" size="20" />
                        </q-btn>
                    </div>
                    <div class="text-subtitle1 text-white m-3 flex justify-between items-center z-10">
                        Небольшое описание конференции
                        <q-btn color="primary" size="15px" label="Подробнее" no-caps/>
                    </div>
                </div>
            </q-carousel-slide>

            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2 text-white text-bold m-3 flex justify-between items-end">
                        Конференция2
                        <q-btn color="secondary" class="h-[15px]" size="15px" no-caps>
                            Идет регистрация<Icon class="ms-2" name="svg-spinners:3-dots-scale-middle" size="20" />
                        </q-btn>
                    </div>
                    <div class="text-subtitle1 text-white m-3 flex justify-between items-center z-10">
                        Небольшое описание конференции
                        <q-btn color="primary" size="15px" label="Подробнее" no-caps/>
                    </div>
                </div>
            </q-carousel-slide>

        </q-carousel>
    </div>
</template>

<style lang="scss" scoped></style>