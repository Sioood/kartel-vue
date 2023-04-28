<script setup>
// import config from "@/config";
import config from "@/config";

const props = defineProps({
  url: {
    required: true,
  },
  // medium is the media to display in lightbox
  medium: {
    required: false,
  },
  title: {
    required: false,
  },
});
</script>

<!-- Change the name with MediaCard might be better for reuse -->
<!-- set for img if preview but it can be a video watch out -->
<template>
  <div class="flex flex-col items-end">
    <div
      @click="open = true"
      class="w-full aspect-video object-cover bg-gray-extralightest cursor-pointer"
    >
      <a
        data-fancybox="gallery"
        :data-caption="props.title"
        :href="
          props.medium
            ? props.medium
            : `${config.media_service}?url=${props.url}&mode=adapt&w=1000&fmt=jpg`
        "
      >
        <img
          class="w-full h-full object-cover aspect-video"
          :src="
            props.url
              ? `${config.media_service}?url=${props.url}&mode=adapt&w=300&fmt=jpg`
              : ''
          "
          :alt="props.title"
        />
      </a>
    </div>
    <span class="block w-full h-1 bg-black"></span>
    <h6 class="text-xs text-gray font-medium uppercase">{{ props.title }}</h6>
  </div>
</template>

<style scoped></style>
