<script setup>
import config from "@/config";

import { ref } from "vue";

import { useConfigApi } from "@/stores/configApi";
const storeApi = useConfigApi();

let input = ref();

let result = ref({
  // focus is the focus state of the input
  focus: false,
  // open is the state of the result modal, can differ with focus
  open: false,
  // disabled is if user hover the result get out of focus don't close it
  // if focus is false and the user move out of the result open equal false
  // it's for have a way of close/open the results however the user interact
  disabled: false,
});

let artworks = ref({});
let students = ref([]);

// too big condition function to be placed in html
// condition for hide the no result message
function hiddenInput() {
  if (input.value) {
    let value = input.value.match(/\w/g) ? false : true;
    if (value === true) {
      return value;
    }

    if (value === false) {
      if (Object.keys(artworks.value).length === 0 || !students.value[0]) {
        return false;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}

// search function for artworks and students, artists can be added in the future
function search(input) {
  if (input.length < 3 || input.replaceAll(" ", "") === "") {
    artworks.value = {};
    // artworks.value = [];

    students.value = [];

    return;
  }

  // trim all space in the start of input ?
  // update the input value with space in the start trimed
  async function searchArtworks(query) {
    let response = await fetch(
      `${config.rest_uri_v2}production/artwork-search?q=${query}`
    );
    let data = await response.json();

    let type = [];

    for (let artwork of data) {
      type.push(artwork.type.toLowerCase());
    }

    let uniqueType = Array.from(new Set(type));

    artworks.value = {};
    uniqueType.forEach((type) => {
      let object = {
        type: type,
        artworks: [],
      };

      artworks.value[type] = object;
    });

    data.forEach((artwork) => {
      artworks.value[artwork.type.toLowerCase()].artworks.push(artwork);
    });
  }
  searchArtworks(input);

  async function searchStudents(query) {
    let response = await fetch(
      `${config.rest_uri_v2}school/student-search?q=${query}`
    );
    let data = await response.json();

    students.value = data;
  }
  searchStudents(input);
}

// Function to get authors of an artwork

// Function to get Artworks of a student
</script>

<template>
  <div class="relative flex flex-col items-center">
    <label
      for="search"
      class="p-1 flex flex-col items-end text-xs text-gray-500"
    >
      <input
        v-model="input"
        @keyup="search(input)"
        @focusin="(result.focus = true), (result.open = true)"
        @focusout="
          (result.focus = false),
            result.disabled === false ? (result.open = false) : null
        "
        type="search"
        name="search"
        id="search"
        class="px-2 py-1 box-border w-full text-lg text-black font-bold capitalize focus:bg-gray-100 transition-all duration-500"
      />
      <span class="w-full h-1 bg-black dark:bg-white"></span>
      SEARCH
    </label>
    <div
      @mousemove="result.disabled = true"
      @mouseout="
        (result.disabled = false),
          result.focus === false ? (result.open = false) : null
      "
      class="absolute bottom-0 translate-y-full p-4 pb-0 box-content w-full max-h-96 overflow-x-scroll flex-col gap-10 bg-white"
      :class="{
        hidden: result.open === false || hiddenInput() === true,
        flex: result.open === true,
      }"
    >
      <h4
        class="p-2 w-full bg-gray-extralightest"
        :class="{
          hidden:
            result.open === false ||
            Object.keys(artworks).length !== 0 ||
            students[0],
          block: result.open === true && hiddenInput() === false,
        }"
      >
        Pas de résultat
      </h4>
      <div
        class="w-full flex flex-col gap-6"
        :class="{
          flex: students[0],
          hidden: !students[0],
        }"
      >
        <ul class="flex flex-col gap-3">
          <h6 class="ml-2 text-xs font-medium text-gray uppercase">Students</h6>
          <li v-for="student in students" :key="student">
            <router-link
              :to="`/artist/${storeApi.getId(student.artist.url)}`"
              class="px-1 py-2 flex flex-col border-l-2 border-gray divide-y"
            >
              <div>
                <h5
                  v-if="student.artist.nickname"
                  class="text-base font-medium"
                >
                  {{ student.artist.nickname }}
                </h5>
                <h5 v-else class="text-base font-medium">
                  {{ `${student.user.first_name}  ${student.user.last_name}` }}
                </h5>
                <h6 class="text-sm">promotion</h6>
              </div>
              <h6 class="text-sm font-medium text-right">artworks</h6>
            </router-link>
          </li>
        </ul>

        <div v-for="artworksType in artworks" :key="artworksType.type">
          <h6 class="ml-2 text-xs font-medium text-gray uppercase">
            {{ artworksType.type }}
          </h6>

          <ul class="flex flex-col gap-3">
            <li v-for="artwork in artworksType.artworks" :key="artwork">
              <router-link
                :to="`/artwork/${storeApi.getId(artwork.url)}`"
                class="px-1 py-2 flex flex-col border-l-2 border-gray divide-y"
              >
                <h5 class="text-base font-medium">{{ artwork.title }}</h5>
                <h6 class="text-sm font-medium text-right">Author</h6>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- <ul class="flex flex-col gap-3">
          <h6 class="ml-2 text-xs font-medium text-gray uppercase">Artworks</h6>
          <li v-for="artwork in artworks" :key="artwork.title">
            <router-link
              :to="`/artwork/${storeApi.getId(artwork.url)}`"
              class="px-1 py-2 flex flex-col border-l-2 border-gray divide-y"
            >
              <h5 class="text-base font-medium">{{ artwork.title }}</h5>
              <h6 class="text-sm font-medium text-right">get author</h6>
              <h6 class="text-sm font-medium text-right">{{ artwork.type }}</h6>
            </router-link>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
