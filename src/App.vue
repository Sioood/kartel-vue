<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

import UiSearch from "@/components/ui/UiSearch.vue";
import UiLink from "@/components/ui/UiLink.vue";

let navigation = ref({
  open: false,
  children: [
    { name: "School", path: "/school/promotion/4" },
    { name: "Artist", path: "/artist/710" },
    { name: "Artwork", path: "/artwork/1" },
    { name: "Média", path: "/media/" },
    { name: "Student profil", path: "/school/artist/447?student=13" },
  ],
});

let theme = ref();

function switchTheme(mode) {
  document.documentElement.classList.toggle("dark");

  if (mode === "dark" || mode === "light") {
    localStorage.theme = `${mode}`;

    mode === "dark" ? (theme.value = "🌒") : (theme.value = "🌖");
  }

  if (mode === "toggle") {
    localStorage.theme === "dark"
      ? ((localStorage.theme = "light"), (theme.value = "🌖"))
      : ((localStorage.theme = "dark"), (theme.value = "🌒"));
  }
}

onMounted(() => {
  if (!localStorage.theme) {
    window.matchMedia("(prefers-color-scheme: dark)")
      ? switchTheme("dark")
      : switchTheme("light");
  } else {
    localStorage.theme === "dark"
      ? (document.documentElement.classList.add("dark"), (theme.value = "🌒"))
      : (document.documentElement.classList.remove("dark"),
        (theme.value = "🌖"));
  }
});
</script>

<template>
  <!-- Make a nav component like a burger menu -->
  <header class="z-10 w-full sticky top-0">
    <!-- <nav
      class="z-10 fixed top-0 left-0 p-3 w-full flex flex-row items-center justify-left gap-2 bg-white shadow-lg shadow-white after:bg-black after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1"
    >
    </nav> -->
    <nav
      class="px-6 py-1 flex flex-row flex-wrap items-center justify-between gap-3 bg-white shadow-lg shadow-white"
    >
      <div class="flex flex-row flex-wrap items-center justify-start gap-3">
        <!-- <button
          class="p-0 w-12 h-12 flex flex-row gap-1 items-center justify-center hover:bg-gray-extralightest"
          @click="
            navigation.open === false
              ? (navigation.open = true)
              : (navigation.open = false)
          "
        >
          <span class="block w-1 h-1 bg-green"></span>
          <span class="block w-1 h-1 bg-orange"></span>
          <span class="block w-1 h-1 bg-red"></span>
        </button> -->

        <!-- <div v-if="navigation.open === true" class="flex flex-row gap-4"> -->
        <!-- <RouterLink
          class="p-2 bg-black text-white hover:underline underline-offset-2"
          :to="item.path"
          >{{ item.name }}
        </RouterLink> -->
        <UiLink
          v-for="(item, index) in navigation.children"
          :key="index"
          :url="item.path"
          :text="item.name"
        />
        <!-- </div> -->
      </div>

      <UiSearch />

      <button
        @click="switchTheme('toggle')"
        class="w-12 h-12 hover:bg-gray-extralightest"
      >
        {{ theme }}
      </button>
    </nav>
    <hr />
  </header>

  <div class="w-full flex gap-8">
    <RouterLink class="sticky top-0 hidden md:block" to="/">
      <img
        class="m-4"
        src="https://kartel.lefresnoy.net/images/candidature/fresnoy-bandeau.jpg"
        alt=""
      />
    </RouterLink>

    <RouterView />
  </div>
</template>

<style scoped></style>
