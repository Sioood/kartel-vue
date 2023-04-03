<script setup>
const props = defineProps(["label", "placeholder", "type"]);
</script>

<template>
  <label for="input" class="p-1 flex flex-col items-end text-xs text-gray-500">
    <input
      @input="$emit('update:value', $event.target.value)"
      :type="props.type"
      class="px-2 py-1 box-border w-full text-lg text-black placeholder-gray font-bold focus:bg-gray-100 transition-all duration-500"
      :placeholder="props.placeholder"
    />
    <span class="w-full h-1 bg-black dark:bg-white"></span>
    <h6 class="uppercase">{{ props.label }}</h6>
  </label>
</template>

<style scoped></style>
