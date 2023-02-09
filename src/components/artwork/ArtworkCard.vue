<script setup>
// define props like url of img media and url artwork

// props for now but query artwork id in the future
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<!-- Change the name with MediaCard might be better for reuse -->
<!-- set for img if preview but it can be a video watch out -->
<template>
  <router-link to="" class="flex flex-col items-end">
    <div
      :class="{ 'ring-8': props.index === 1 }"
      class="w-full aspect-video object-cover bg-gray-extralightest hover:ring-8 ring-inset ring-black"
    >
      <img
        class="object-cover aspect-video"
        :src="props.url"
        :alt="props.title"
      />
    </div>
    <span class="block w-full h-1 bg-black"></span>
    <h6 class="text-xs text-gray font-medium uppercase">{{ props.title }}</h6>
  </router-link>
</template>

<style scoped></style>
