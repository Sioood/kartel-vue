<script setup>
import config from "@/config";

import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";

/**

  Components

**/
import {
  content as artworks,
  getContent as getArtworks,
  offset,
  load,
} from "@/composables/artwork/getContent";

/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import ArtworkCard from "@/components/artwork/ArtworkCard.vue";

const router = useRouter();

let watcher = ref();

let years = ref([]);
// let year = ref();

let genres = ref(null);
let keywords = ref(null);
let productionYear = ref(null);
let q = ref(null);
let shootingPlace = ref(null);
let type = ref(null);

let params = ref({
  genres,
  keywords,
  productionYear,
  q,
  shootingPlace,
  type,
});

// change the params if the year change and push to router
function onChangeYear(year) {
  if (year === null) {
    router.push("");
  } else {
    router.push(`?year=${year}`);
  }
  artworks.value = [];
  offset.value = 1;

  // reload new artworks with the new production year
  getArtworks("artwork", params.value);
}

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
      getArtworks("artwork", params.value);
    } else if (!load.value && entry.intersectionRatio === 1) {
      // intersectingRatio equal to the ration visible of the watcher 1 indicate that is it full visible in the page
      // this is for avoid the watcher to be full visible in the beginning and block the infinite scroll
      // [BUG] but for small size load to because the page load with nothing from the beginning -> maybe check if artworks is not empty
      offset.value++;
      getArtworks("artwork", params.value);
      offset.value--;
    }
  });
};

onMounted(() => {
  const routeYear = router.currentRoute.value.query.year;

  // set if year is already selected
  if (routeYear) {
    productionYear.value = routeYear;
    getArtworks("artwork", params.value);
  } else {
    productionYear.value = null;
    getArtworks("artwork", params.value);
  }

  const observer = new IntersectionObserver(handleObserver);

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
              @change="onChangeYear(productionYear)"
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
    <ul class="pb-12 grid grid-cols-fluid-14 gap-3">
      <li v-for="artwork in artworks" :key="artwork.url">
        <ArtworkCard
          :url="artwork.url"
          :picture="removePreprod(artwork.picture)"
          :title="artwork.title"
        />
      </li>
      <!-- Need to prevent multiple request in function with a Boolean -->
      <li ref="watcher" id="watcher"></li>
    </ul>
  </main>
</template>

<style scoped></style>
