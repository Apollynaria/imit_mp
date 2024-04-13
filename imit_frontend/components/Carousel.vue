<script setup lang="ts">
const slide = ref(1);
const autoplay = ref(true);

const props = defineProps({
    slides: {
        type: Array,
        default: []
    }
});

</script>



<template>
    <div class="q-pa-md">
        <q-carousel animated v-model="slide" infinite navigation navigation-position="top" :autoplay="autoplay" arrows
            transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
            @mouseleave="autoplay = true">
            <carousel-slide v-for="(slide, index) in slides" :key="index" :name="index + 1" :img_src="slide.img_src"
                :title="slide.title" :short_description="slide.short_description" :date="slide.date"
                :date_request="slide.date_request" :page_link="slide.page_link" :register_link="slide.register_link">

            </carousel-slide>

        </q-carousel>
    </div>
</template>

<style lang="scss" scoped></style>