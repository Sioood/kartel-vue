<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted, watch } from "vue";

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

const router = useRouter();

let typeOfContent = ref();
let watcher = ref();

let years = ref([]);
// let year = ref();

let genres = ref(null);
let keywords = ref(null);
let productionYear = ref(null);
let q = ref(null);
let shootingPlace = ref(null);
let type = ref(null);

// let typeOfContent define the params and display them inside the dom with a includes or something like a dictionnary
let params = ref({
  genres,
  keywords,
  productionYear,
  q,
  shootingPlace,
  type,
});

watch([genres, keywords, productionYear, q, shootingPlace, type], () => {
  // prevent the observer to fetch at the same time
  observer.unobserve(watcher.value);

  // can filter only defined parameters for a cleanest URL
  router.push({ path: typeOfContent.value, query: { ...params.value } });

  offset.value = 1;
  artworks.value = [];

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
    years.value.push(i);
  }
}
getYears();

// each time the watcher intersecting fetch a new load of artworks
const handleObserver = (entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    // console.log(load.value);

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

onMounted(() => {
  // name or path to set default content
  typeOfContent.value = router.currentRoute.value.path.replace("/", "");

  let queries = router.currentRoute.value.query;
  let queriesArr = Object.keys(queries).map((key) => queries[key]);

  // set default value if present in queries
  for (let param in params.value) {
    queries[param]
      ? (params.value[param] = queries[param])
      : (params.value[param] = null);
  }

  // prevent the switch type of content to have some content of the precedent type and have a offset
  contents.value = [];
  offset.value = 1;

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
      <div>
        <label
          for="date"
          class="flex flex-col items-end after:block after:w-full after:h-1 after:bg-black"
        >
          <div class="w-full flex items-end">
            <svg
              class="h-fit fill-gray-dark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 16l-6-6h12z" />
            </svg>
            <select
              name="date"
              id="date"
              class="px-2 w-full after:block after:w-10 after:h-1 after:bg-black cursor-pointer"
              v-model="productionYear"
            >
              <option :value="null">toutes dates</option>
              <option :value="year" v-for="year in years" :key="year">
                {{ year }}
              </option>
            </select>
          </div>
        </label>
        <h6 class="pl-4 text-xs text-right text-gray">Date de production</h6>
      </div>
    </div>
    <span class="my-3 w-full h-0.5 block bg-gray-extralight"></span>
    <ul>
      <li
        v-if="typeOfContent === 'artworks'"
        class="pb-12 grid grid-cols-fluid-14 gap-3"
      >
        <div v-for="content in contents" :key="content.url">
          <ArtworkCard
            :url="content.url"
            :picture="removePreprod(artwork.picture)"
            :title="content.title"
          />
        </div>
      </li>

      <li
        v-else-if="typeOfContent === 'artists'"
        class="pb-12 grid grid-cols-fluid-14 gap-3"
      >
        <div v-for="content in contents" :key="content">
          <!-- {{ content }} -->
          <ArtistCard :artist="content"></ArtistCard>
        </div>
      </li>

      <!-- Need to prevent multiple request in function with a Boolean -->
      <li ref="watcher" id="watcher"></li>
    </ul>
  </main>
</template>

<style scoped></style>
