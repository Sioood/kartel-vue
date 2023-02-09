<script setup>
const props = defineProps({
  extern: Boolean,
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div v-if="props.extern !== true">
    <RouterLink
      class="overflow-hidden p-2 flex flex-col font-medium after:block after:w-full after:h-1 after:bg-black after:transition-all hover:after:translate-x-1/2"
      :to="props.url"
      >{{ props.text }}
    </RouterLink>
  </div>

  <a v-else :href="props.url"></a>
</template>

<style scoped></style>
