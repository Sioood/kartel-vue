<script setup>
// import config from "@/config";
import config from "@/config";

import mediaPlaceholder from "@/assets/placeholder_media.svg";

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

/**
 * Determine the type of medium based on props.medium and props.url.
 * @returns {string|null} - Returns "iframe" if the medium is a soundcloud link, "pdf" if the url is a pdf, and null if neither.
 */

function type() {
  const item = props.medium
    ? props.medium
    : `${config.media_service}?url=${props.url}&mode=adapt&w=1000&fmt=jpg`;

  if (item.includes("soundcloud")) {
    return "iframe";
  }

  if (item.includes(".pdf")) {
    return "pdf";
  }

  return null;
}
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
        :data-type="type()"
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
              : mediaPlaceholder
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
