<script setup>
import { ref } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

const open = ref(false);
</script>

<!-- Change the name with MediaCard might be better for reuse -->
<!-- set for img if preview but it can be a video watch out -->
<template>
  <div class="flex flex-col items-end">
    <Teleport to="body">
      <div
        v-if="open"
        class="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-full h-screen flex justify-center bg-black/[.5]"
      >
        <div class="max-w-max h-5/6 flex flex-col items-center gap-3">
          <div
            class="px-4 py-2 w-full flex items-center justify-between text-white"
          >
            <h2 class="text-2xl font-medium capitalize">{{ props.title }}</h2>
            <button @click="open = false" class="px-4 py-2 border">
              Close
            </button>
          </div>
          <!-- Can be a video, need to make a condition and check for a preview -->
          <img
            class="h-full object-cover aspect-video"
            :src="props.url"
            :alt="props.title"
          />
        </div>
      </div>
    </Teleport>

    <div
      @click="open = true"
      class="w-full aspect-video object-cover bg-gray-extralightest cursor-pointer"
    >
      <img
        class="object-cover aspect-video"
        :src="props.url"
        :alt="props.title"
      />
    </div>
    <span class="block w-full h-1 bg-black"></span>
    <h6 class="text-xs text-gray font-medium uppercase">{{ props.title }}</h6>
  </div>
</template>

<style scoped></style>
