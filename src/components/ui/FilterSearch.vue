<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["query"]);

let value = ref();

onMounted(() => {
  value.value = props.query;
});
</script>

<template>
  <label for="search" class="p-1 flex flex-col items-end text-xs text-gray-500">
    <input
      v-model="value"
      @keyup.enter="$emit('update:modelValue', $event.target.value)"
      type="search"
      name="search"
      id="search"
      class="px-2 py-1 box-border w-full text-sm text-black font-bold capitalize focus:bg-gray-100 transition-all duration-500"
    />
    <span class="w-full h-1 bg-black dark:bg-white"></span>
    Recherche
  </label>
</template>

<style scoped></style>
