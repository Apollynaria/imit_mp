<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        default: "Title"
    },
    link: {
        type: String,
        default: "50%"
    }
});

</script>

<template>
    <div>
        <nuxt-link :to=link
            class="text-[16px] transition-all duration-400 pb-[1px] border-b border-transparent hover:border-[#000] text-[#000] dark:hover:border-[#fff] dark:text-[#fff]"
            type="button">
            {{ title }}
        </nuxt-link>
    </div>
</template>

<style lang="scss" scoped></style>