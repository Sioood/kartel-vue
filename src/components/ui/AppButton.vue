<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="py-2 px-4 w-min bg-black dark:bg-white text-white dark:text-black"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
