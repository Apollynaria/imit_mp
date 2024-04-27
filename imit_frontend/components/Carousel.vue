<script setup lang="ts">
import { getFullDate } from '../services/Date';
import { serverLink } from '~/services/server';

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
            <carousel-slide v-for="(slide, index) in slides" :key="index" :name="index + 1" :img_src="serverLink + slide.title_file.path.substring(8)"
                :conf_id="slide.id" :title="slide.name" :date="getFullDate(slide.date_begin, slide.date_end)" :date_request="getFullDate(slide.date_for_request_begin
                    , slide.date_for_request_end) ">
            </carousel-slide>
        </q-carousel>
    </div>
</template>

<style lang="scss" scoped></style>