<script setup>
import config from "@/config";

import { watch } from "vue";

import { load } from "@/composables/interceptors";

import { getId } from "@/composables/getId";
import {
  input,
  result,
  artists,
  artworks,
  search,
  hiddenInput,
} from "@/composables/search";

import { useRouter } from "vue-router";
const router = useRouter();

// Function to get authors of an artwork

// Function to get Artworks of a student

watch(
  () => router.currentRoute.value.path,
  () => {
    input.value = "";
  }
);
</script>

<template>
  <div class="relative flex flex-col items-center">
    <label for="search" class="p-1 flex flex-col items-end">
      <input
        v-model="input"
        @input="search(input)"
        @focusin="(result.focus = true), (result.open = true)"
        @focusout="
          (result.focus = false),
            result.disabled === false ? (result.open = false) : null
        "
        type="search"
        id="search"
        class="px-2 py-1 box-border w-full text-lg text-black font-bold capitalize focus:bg-gray-100 transition-all duration-500"
      />
      <span class="w-full h-1 bg-black dark:bg-white"></span>
      <span class="text-xs text-gray-500 uppercase">{{ $t("search") }}</span>
    </label>
    <div
      @mousemove="result.disabled = true"
      @mouseout="
        (result.disabled = false),
          result.focus === false ? (result.open = false) : null
      "
      class="absolute bottom-0 translate-y-full p-4 pb-0 box-content w-full max-h-96 overflow-y-auto flex-col gap-10 bg-white"
      :class="{
        hidden: result.open === false || hiddenInput() === true,
        flex: result.open === true,
      }"
    >
      <h4
        v-if="!load.status"
        class="p-2 w-full font-medium"
        :class="{
          hidden:
            result.open === false ||
            Object.keys(artworks).length !== 0 ||
            artists[0],
          block: result.open === true && hiddenInput() === false,
        }"
      >
        Aucun résultat ...
      </h4>
      <h4 v-else class="p-2 w-full font-medium">Recherche en cours ...</h4>

      <div data-test="results" class="w-full flex flex-col gap-6">
        <!-- :class="{
          flex: artworks.length !== 0 || artists[0],
          hidden: artworks.length === 0 && !artists[0],
        }" -->
        <ul
          class="flex-col gap-3"
          :class="{
            flex: artists[0],
            hidden: !artists[0],
          }"
        >
          <h6 class="ml-2 text-xs font-medium text-gray uppercase">
            {{ $t("Artists") }}
          </h6>
          <li v-for="artist in artists" :key="artist">
            <router-link
              :to="`/artist/${getId(artist.url)}`"
              class="px-1 py-2 flex flex-col border-l-2 border-gray divide-y"
            >
              <div>
                <h5 v-if="artist.nickname" class="text-base font-medium">
                  {{ artist.nickname }}
                </h5>
                <h5 v-else class="text-base font-medium">
                  {{ `${artist.user.first_name}  ${artist.user.last_name}` }}
                </h5>
              </div>
              <div class="flex flex-col">
                <h6
                  class="text-sm font-medium text-right"
                  v-for="artwork in artist.artworks"
                  :key="artwork.title"
                >
                  {{ artwork.title }}
                </h6>
              </div>
            </router-link>
          </li>
        </ul>

        <!-- <div
          v-for="artworksType in artworks"
          :key="artworksType.type"
          class="flex-col"
          :class="{
            flex: Object.keys(artworks).length !== 0,
            hidden: Object.keys(artworks).length === 0,
          }"
        >
          <h6 class="ml-2 text-xs font-medium text-gray uppercase">
            {{ artworksType.type }}
          </h6>

          
        </div> -->

        <ul
          class="flex-col gap-3"
          :class="{
            flex: artworks[0],
            hidden: !artworks[0],
          }"
        >
          <h6 class="ml-2 text-xs font-medium text-gray uppercase">
            {{ $t("Artworks") }}
          </h6>

          <li v-for="artwork in artworks" :key="artwork">
            <router-link
              :to="`/artwork/${getId(artwork.url)}`"
              class="px-1 py-2 flex flex-col border-l-2 border-gray divide-y"
            >
              <div>
                <h5 class="text-base font-medium">{{ artwork.title }}</h5>
                <h6 class="text-sm">{{ artwork.type }}</h6>
              </div>
              <div
                class="flex flex-col gap-1"
                v-for="author in artwork.authorsNames"
                :key="author"
              >
                <h6 class="text-sm font-medium text-right">
                  {{ author }}
                </h6>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
