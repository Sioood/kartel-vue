<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";

import { load } from "@/composables/interceptors";

import UiSearch from "@/components/ui/UiSearch.vue";
import UiLink from "@/components/ui/UiLink.vue";
import AuthCard from "@/components/auth/AuthCard.vue";

const router = useRouter();

/**

  Navigation

**/

// Open is for the mobile menu
// if true block the scroll
let navigation = ref({
  open: false,
  children: [
    { name: "School", path: "/school/promotion/28" },
    { name: "Artists", path: "/artists" },
    { name: "Artworks", path: "/artworks" },
  ],
});

// when an user go to a page close the navigation by default
watch(router.currentRoute, () => {
  navigation.value.open = false;
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

// watch if responsive menu is open to handle the scroll
// prevent user to scroll to far of the point when he click on the menu
watch(navigation.value, () => {
  function handleScroll() {
    const body = document.body;
    if (navigation.value.open === true) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }
  }
  handleScroll();
});

onMounted(() => {
  // Set the default theme by the user
  // if (!localStorage.theme) {
  //   window.matchMedia("(prefers-color-scheme: dark)")
  //     ? switchTheme("dark")
  //     : switchTheme("light");
  // } else {
  //   localStorage.theme === "dark"
  //     ? (document.documentElement.classList.add("dark"), (theme.value = "🌒"))
  //     : (document.documentElement.classList.remove("dark"),
  //       (theme.value = "🌖"));
  // }

  // Listen the resize for prevent computer user to stay stuck inside the mobile menu
  addEventListener("resize", () => {
    navigation.value.open = false;
  });
});

onUnmounted(() => {
  removeEventListener("resize");
});
</script>

<template>
  <!-- loader -->
  <span
    class="z-[9999] fixed top-0 left-0 block w-full h-1 bg-black origin-left"
    :class="{ hidden: !load.status && load.progress === 0 }"
    :data-progress="load.progress"
    :style="{ transform: `scaleX(${load.progress / 100 + 1 / 100})` }"
  ></span>

  <!-- Make a nav component like a burger menu -->
  <header class="z-30 w-full fixed top-0">
    <!-- <nav
      class="z-10 fixed top-0 left-0 p-3 w-full flex flex-row items-center justify-left gap-2 bg-white shadow-lg shadow-white after:bg-black after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1"
    >
    </nav> -->
    <nav
      class="px-6 py-1 hidden lg:flex flex-row flex-wrap items-center justify-between gap-3 bg-white shadow-lg shadow-white"
    >
      <ul class="flex flex-row flex-wrap items-center justify-start gap-3">
        <!-- <button
          class="p-0 w-12 h-12 flex flex-row gap-1 items-center justify-center hover:bg-gray-extralightest"
          @click="
            navigation.open === false
              ? (navigation.open = true, disableScroll())
              : (navigation.open = false,enab;eScroll())
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
        <img
          src="./assets/logo-Fresnoy-transparent.png"
          alt=""
          class="h-7 lg:hidden"
        />

        <li v-for="(item, index) in navigation.children" :key="index">
          <UiLink :url="item.path" :text="$t(item.name)" data-test="nav-link" />
        </li>
        <!-- </div> -->
      </ul>

      <UiSearch v-if="router.currentRoute.value.path !== '/'" />

      <AuthCard />

      <!-- <button
        @click="switchTheme('toggle')"
        class="w-12 h-12 hover:bg-gray-extralightest"
        data-test="toggle-theme"
      >
        {{ theme }}
      </button> -->
    </nav>

    <nav
      class="lg:hidden p-2 flex flex-col bg-white"
      :class="{ 'h-screen': navigation.open === true }"
    >
      <div class="h-10 flex flex-row items-center justify-between">
        <RouterLink class="h-3/4" to="/">
          <img
            class="h-full"
            src="./assets/logo-Fresnoy-transparent.png"
            alt=""
          />
        </RouterLink>
        <button
          @click="
            navigation.open === false
              ? (navigation.open = true)
              : (navigation.open = false)
          "
          class="group relative aspect-square w-7 flex flex-col"
        >
          <span
            class="group-hover:mb-0 transition-all block w-full h-1 bg-gray-lightest"
            :class="{
              'mb-0.5': navigation.open === false,
              // absolute: navigation.open === true,
            }"
          ></span>
          <span
            class="group-hover:mb-0.5 transition-all block w-full h-1 bg-black"
            :class="{
              'mb-1': navigation.open === false,
              // absolute: navigation.open === true,
            }"
          ></span>
          <span
            class="group-hover:mb-0.5 transition-all block w-full h-1 bg-black"
            :class="{
              'mb-1': navigation.open === false,
              // absolute: navigation.open === true,
            }"
          ></span>
          <span class="block w-full h-1 bg-black"></span>
        </button>
      </div>

      <div
        class="p-10 h-full flex-col justify-around"
        :class="{
          hidden: navigation.open === false,
          flex: navigation.open === true,
        }"
      >
        <!-- search might be better at the top because the dropdown results can be on top -->
        <div class="w-full flex justify-end">
          <UiSearch />
        </div>

        <ul class="flex flex-col justify-center gap-2">
          <li v-for="(item, index) in navigation.children" :key="index">
            <RouterLink
              @click="
                navigation.open === false
                  ? (navigation.open = true)
                  : (navigation.open = false)
              "
              class="text-2xl font-bold after:block after:w-20 after:h-1 after:bg-black"
              :to="item.path"
            >
              {{ $t(item.name) }}
            </RouterLink>
          </li>
        </ul>

        <div class="w-full flex justify-end">
          <AuthCard />
        </div>
      </div>
    </nav>
    <hr />
  </header>

  <div class="mt-12 lg:mt-20 w-full flex gap-8">
    <RouterLink class="sticky top-0 hidden lg:block" to="/">
      <img
        class="m-4 sticky top-20"
        src="https://kartel.lefresnoy.net/images/candidature/fresnoy-bandeau.jpg"
        alt=""
        data-test="logo-lg"
      />
    </RouterLink>

    <!-- key detect changement and reload component if is the same route with a different id (component is already mounted) -->
    <RouterView />
    <!-- <RouterView :key="$route.path" /> -->
  </div>
</template>

<style scoped></style>
