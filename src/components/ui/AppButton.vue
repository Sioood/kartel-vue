<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <button class="py-2 px-4 bg-black dark:bg-white text-white dark:text-dark">
    {{ text }}
  </button>
</template>

<style scoped></style>
