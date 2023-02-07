<script setup>
// define props like url of img media and url artwork

// props for now but query artwork id in the future
const props = defineProps({
  index: Number,
});
</script>

<!-- Change the name with MediaCard might be better for reuse -->
<template>
  <router-link to="">
    <div
      :class="{ 'ring-8': props.index === 1 }"
      class="object-cover bg-gray-extralightest bg-cover bg-[url('https://source.unsplash.com/random/')] h-16 hover:ring-8 ring-inset ring-black"
    ></div>
  </router-link>
</template>

<style scoped></style>
