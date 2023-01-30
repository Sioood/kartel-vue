<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav
      class="z-10 fixed p-3 w-full flex flex-row items-center justify-left gap-2 bg-white after:bg-black after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/school">School</RouterLink>
    </nav>
  </header>

  <RouterView class="pt-12" />
</template>

<style scoped></style>
