<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="fixed p-2 flex flex-row items-center justify-left gap-2">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/school">School</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
