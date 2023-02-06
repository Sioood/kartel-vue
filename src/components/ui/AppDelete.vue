<script setup>
import { ref } from "vue";

let validation = ref(false);

// Props function ? possible ?
</script>

<template>
  <div
    class="p-3 flex justify-end gap-8"
    :class="{
      'flex-row-reverse': validation === true,
      'justify-between': validation === true,
      'bg-red': validation === true,
      'bg-gray-extralightest': validation === false,
    }"
  >
    <button
      @click="validation = false"
      class="w-5 h-5 bg-[url('https://kartel.lefresnoy.net/images/candidature/icons/cancel.svg')]"
      :class="{
        invisible: validation === false,
        visible: validation === true,
      }"
    ></button>

    <h5
      class="uppercase font-bold text-black"
      :class="{
        invisible: validation === false,
        visible: validation === true,
      }"
    >
      Supprimer
    </h5>
    <button
      @click="validation = true"
      class="w-5 h-5 hover:animate-shake bg-[url('https://kartel.lefresnoy.net/images/candidature/icons/trash.svg')]"
    ></button>
  </div>
</template>

<style scoped></style>
