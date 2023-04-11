<script setup>
import axios from "axios";

import { useRouter } from "vue-router";

import { ref, onBeforeMount, onMounted, watch } from "vue";

/**

  Components

**/
import {
  content as contents,
  getContent,
  offset,
  load,
} from "@/composables/getContent";

/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import ArtworkCard from "@/components/artwork/ArtworkCard.vue";
import ArtistCard from "@/components/artist/ArtistCard.vue";
import UiSelect from "@/components/ui/UiSelect.vue";
import FilterSearch from "@/components/ui/FilterSearch.vue";

const router = useRouter();

let typeOfContent = ref();
let watcher = ref();

/**
 *
 *  default value/option of refs
 *
 */
// let years = ref([]);

let defGenres = ref(null);
let defKeywords = ref(null);
let defNationality = ref(null);
let defProductionYear = ref([]);
// let defQ = ref(null);
let defShootingPlace = ref(null);
let defType = ref(null);

/**
 *
 *  refs
 *
 */
let genres = ref(null);
let keywords = ref(null);
let nationality = ref(null);
let productionYear = ref(null);
let q = ref(null);
let shootingPlace = ref(null);
let type = ref(null);

// let typeOfContent define the params and display them inside the dom with a includes or something like a dictionnary
let params = ref();

watch([genres, keywords, productionYear, q, shootingPlace, type], () => {
  // prevent the observer to fetch at the same time
  observer.unobserve(watcher.value);

  // can filter only defined parameters for a cleanest URL
  router.push({ path: typeOfContent.value, query: { ...params.value } });

  offset.value = 1;
  contents.value = [];

  getContent(typeOfContent.value, params.value);

  // reobserve
  observer.observe(watcher.value);

  // getContent("artwork", params.value);
});

// set option of production year for select based on a min (1998) to now
function getYears() {
  let max = new Date().getFullYear();
  let min = 1998;
  let number = max - (max - min);

  for (let i = max; i >= number; i--) {
    defProductionYear.value.push(i);
  }
}
getYears();

// each time the watcher intersecting fetch a new load of artworks
const handleObserver = (entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    // console.log(load.value);

    console.log(true);

    if (load.value && entry.isIntersecting) {
      // observer cause duplicate request sometimes
      getContent(typeOfContent.value, params.value);
    } else if (!load.value && entry.intersectionRatio === 1) {
      // intersectingRatio equal to the ration visible of the watcher 1 indicate that is it full visible in the page
      // this is for avoid the watcher to be full visible in the beginning and block the infinite scroll
      // [BUG] but for small size load to because the page load with nothing from the beginning -> maybe check if artworks is not empty
      offset.value++;
      getContent(typeOfContent.value, params.value);
      offset.value--;
    }
  });
};

const observer = new IntersectionObserver(handleObserver);

onBeforeMount(() => {
  // prevent the switch type of content to have some content of the precedent type and have a offset
  contents.value = [];
  offset.value = 1;
});

onMounted(() => {
  // name or path to set default content
  typeOfContent.value = router.currentRoute.value.path.replace("/", "");

  let queries = router.currentRoute.value.query;
  let queriesArr = Object.keys(queries).map((key) => queries[key]);

  // set params with type
  if (typeOfContent.value === "artworks") {
    params.value = {
      genres,
      keywords,
      productionYear,
      q,
      shootingPlace,
      type,
    };
  } else {
    params.value = {
      nationality,
      q,
    };
  }

  // set default value if present in queries
  for (let param in params.value) {
    queries[param]
      ? (params.value[param] = queries[param])
      : (params.value[param] = null);
  }

  if (queriesArr.every((value) => value === null)) {
    getContent(typeOfContent.value, params.value);
  }

  // set the observer
  observer.observe(watcher.value);
});

// Need to remove this and all element using this function for Prod
function removePreprod(url) {
  if (url) {
    return url.replace("preprod.", "");
  }
}
</script>

<template>
  <main class="pt-10 lg:pr-20 px-10 lg:px-0 w-full">
    <UnderlineTitle
      class="w-max mb-6"
      title="Oeuvres"
      :uppercase="true"
      :underlineSize="1"
      :fontSize="1"
    />
    <!-- fluid grid -->
    <div class="mb-6 flex items-center gap-6">
      <h3 class="text-lg font-medium text-gray-dark">Filtres :</h3>
      <UiSelect
        v-if="params && Object.keys(params).includes('productionYear')"
        :options="defProductionYear"
        defaultValue="toutes dates"
        :selectedValue="productionYear"
        desc="Date de production"
        @update:option="(newValue) => (productionYear = newValue)"
      ></UiSelect>

      <UiSelect
        v-if="params && Object.keys(params).includes('nationality')"
        :options="defNationality"
        defaultValue="toutes nationalités"
        :selectedValue="nationality"
        desc="Nationalité"
        @update:option="(newValue) => (nationality = newValue)"
      ></UiSelect>

      <UiSelect
        v-if="params && Object.keys(params).includes('genres')"
        :options="defGenres"
        defaultValue="tout genres"
        :selectedValue="genres"
        desc="Genres"
        @update:option="(newValue) => (genres = newValue)"
      ></UiSelect>

      <UiSelect
        v-if="params && Object.keys(params).includes('keywords')"
        :options="defKeywords"
        defaultValue="aucun"
        :selectedValue="keywords"
        desc="Keywords"
        @update:option="(newValue) => (keywords = newValue)"
      ></UiSelect>

      <UiSelect
        v-if="params && Object.keys(params).includes('shootingPlace')"
        :options="defShootingPlace"
        defaultValue="tout"
        :selectedValue="shootingPlace"
        desc="Lieu de tournage"
        @update:option="(newValue) => (shootingPlace = newValue)"
      ></UiSelect>

      <UiSelect
        v-if="params && Object.keys(params).includes('type')"
        :options="defType"
        defaultValue="tout type"
        :selectedValue="type"
        desc="Type"
        @update:option="(newValue) => (type = newValue)"
      ></UiSelect>

      <FilterSearch
        :query="q"
        @update:modelValue="(newValue) => (q = newValue)"
      ></FilterSearch>
    </div>
    <span class="my-3 w-full h-0.5 block bg-gray-extralight"></span>

    <div>
      <ul
        v-if="typeOfContent === 'artworks'"
        class="pb-12 grid grid-cols-fluid-14 gap-3"
      >
        <li v-for="content in contents" :key="content.url">
          <ArtworkCard
            :url="content.url"
            :picture="removePreprod(content.picture)"
            :title="content.title"
          />
        </li>
      </ul>

      <ul
        v-else-if="typeOfContent === 'artists'"
        class="pb-12 grid grid-cols-fluid-14 gap-3"
      >
        <li v-for="content in contents" :key="content">
          <!-- {{ content }} -->
          <ArtistCard :artist="content"></ArtistCard>
        </li>
      </ul>
      <span ref="watcher" id="watcher" class="invisible block w-1 h-1"></span>
    </div>
  </main>
</template>

<style scoped></style>
