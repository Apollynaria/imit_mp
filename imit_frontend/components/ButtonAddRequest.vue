<script setup lang="ts">

const props = defineProps({
    link: {
        type: String,
        default: '/'
    }
});

</script>

<template>
    <div class="z-40 fixed bottom-[12px] right-[60px]">
        <q-btn :to="link" color="primary"
            icon="add" size="md" label="Подать заявку"/>
    </div>
</template>


<style lang="scss" scoped></style>