<script setup>
import { ref } from "vue";

const props = defineProps({
  // required true
  desc_fr: String,
  desc_en: String,
});

let bio = ref({
  lang: "fr",
  data: !props.desc_fr && props.desc_en ? props.desc_en : props.desc_fr,
});
</script>

<template>
  <div class="w-full flex flex-col items-end">
    <div class="p-4 w-full bg-gray-extralightest dark:bg-black-light">
      <p class="text-xs text-gray dark:text-gray-extralight">
        {{ bio.data }}
      </p>
    </div>
    <div class="w-full h-1 bg-black dark:bg-white"></div>
    <div class="w-full flex justify-between">
      <div class="flex gap-2 font-bold">
        <!-- Underline only the selected (with dynamic class and ref) -->
        <button
          v-if="props.desc_fr"
          :class="{
            underline: bio.lang === 'fr',
          }"
          @click="
            bio.lang = 'fr';
            bio.data = props.desc_fr;
          "
        >
          FR
        </button>
        <button
          v-if="props.desc_en"
          :class="{
            underline: bio.lang === 'en',
          }"
          @click="
            bio.lang = 'en';
            bio.data = props.desc_en;
          "
        >
          EN
        </button>
      </div>
      <h6 class="text-xs text-gray uppercase">Description</h6>
    </div>
  </div>
</template>

<style scoped></style>
