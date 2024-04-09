<script setup lang="ts">

const config = useRuntimeConfig()

// Access public variables
const users = await $fetch(`/users`, {
  baseURL: config.public.apiBase,
//   headers: {
//     // Access a private variable (only available on the server)
//     Authorization: `Bearer ${config.apiSecret}`
//   }
})

</script>

<template>
    <div v-for="user in users">
        {{ user.id }} {{ user.name }}
    </div>
</template>

<style lang="scss" scoped>

</style>