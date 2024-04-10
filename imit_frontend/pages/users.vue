<script setup lang="ts">

const config = useRuntimeConfig()

var token = "";
var user = JSON.parse(localStorage.getItem('user'));
if (user && user.accessToken) {
  token = user.accessToken;

}
// Access public variables
const users = await $fetch(`/users`, {
  baseURL: config.public.apiBase,
  headers: {
    "x-access-token": token,
  },
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

<style lang="scss" scoped></style>