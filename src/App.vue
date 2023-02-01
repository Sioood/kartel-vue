<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

let navigation = ref({
  open: false,
  children: [
    { name: "Home", path: "/" },
    { name: "School", path: "/school/" },
  ],
});
</script>

<template>
  <!-- Make a nav component like a burger menu -->
  <header class="z-10 fixed top-0 right-0">
    <!-- <nav
      class="z-10 fixed top-0 left-0 p-3 w-full flex flex-row items-center justify-left gap-2 bg-white shadow-lg shadow-white after:bg-black after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1"
    >
    </nav> -->
    <nav class="w-min flex flex-row items-start justify-start gap-4">
      <div class="p-3 flex flex-row-reverse items-center justify-start gap-3">
        <button
          class="p-0 w-12 h-12 flex flex-row gap-1 items-center justify-center hover:bg-gray-100"
          @click="
            navigation.open === false
              ? (navigation.open = true)
              : (navigation.open = false)
          "
        >
          <span class="block w-1 h-1 bg-black"></span
          ><span class="block w-1 h-1 bg-black"></span
          ><span class="block w-1 h-1 bg-black"></span>
        </button>

        <div v-if="navigation.open === true" class="flex flex-row gap-4">
          <RouterLink
            class="p-2 bg-black text-white hover:underline underline-offset-2"
            v-for="(item, index) in navigation.children"
            :key="index"
            :to="item.path"
            >{{ item.name }}</RouterLink
          >
        </div>
      </div>
    </nav>
  </header>

  <RouterLink class="sticky top-0" to="/">
    <img
      class="m-4"
      src="https://kartel.lefresnoy.net/images/candidature/fresnoy-bandeau.jpg"
      alt=""
    />
  </RouterLink>

  <RouterView />
</template>

<style scoped></style>
