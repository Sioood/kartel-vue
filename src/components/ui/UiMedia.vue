<script setup>
// import config from "@/config";
import config from "../../config";

import { ref } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  // medium is the media to display in lightbox
  medium: {
    required: false,
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
    <!-- Lightbox -> can be a library -->
    <Teleport v-if="open" to="body">
      <div
        @click="open = false"
        class="z-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/[.5]"
      ></div>
      <div
        class="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-screen flex items-center justify-center overflow-y-scroll"
      >
        <div
          class="h-full max-w-max flex flex-col items-center justify-center gap-3 bg-gray-extralightest border"
        >
          <div class="px-4 py-2 w-full flex items-center justify-between gap-3">
            <h2 class="w-3/4 text-2xl font-medium">
              {{ props.title }}
            </h2>
            <button @click="open = false" class="px-4 py-2 border">
              Close
            </button>
          </div>
          <!-- Can be a video, need to make a condition and check for a preview -->
          <img
            v-if="!props.medium"
            class="w-full h-full object-cover aspect-video"
            :src="`${config.media_service}?url=${props.url}&mode=adapt&w=1000&fmt=jpg`"
            :alt="props.title"
          />
          <video
            v-else
            class="w-full h-full object-cover aspect-video"
            controls
            autoplay
            :src="props.medium"
          ></video>
        </div>
      </div>
    </Teleport>

    <div
      @click="open = true"
      class="w-full aspect-video object-cover bg-gray-extralightest cursor-pointer"
    >
      <img
        class="w-full h-full object-cover aspect-video"
        :src="`${config.media_service}?url=${props.url}&mode=adapt&w=300&fmt=jpg`"
        :alt="props.title"
      />
    </div>
    <span class="block w-full h-1 bg-black"></span>
    <h6 class="text-xs text-gray font-medium uppercase">{{ props.title }}</h6>
  </div>
</template>

<style scoped></style>
