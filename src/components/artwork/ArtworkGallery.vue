<script setup>
/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiMedia from "@/components/ui/UiMedia.vue";

const props = defineProps({
  galleries: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Need to remove this and all element using this function for Prod
function removePreprod(url) {
  if (url) {
    return url.replace("preprod.", "");
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <UnderlineTitle
      class="w-max"
      :title="props.title"
      :uppercase="true"
      :underlineSize="1"
      :fontSize="2"
    />
    <div
      v-for="gallery in props.galleries"
      :key="gallery"
      class="flex flex-col gap-2"
    >
      <p>{{ gallery.description }}</p>
      <ul class="grid grid-cols-2 gap-3">
        <li v-for="media in gallery.mediaData" :key="media">
          <UiMedia
            :url="removePreprod(media.picture)"
            :medium="media.medium_url"
            :title="media.label"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
