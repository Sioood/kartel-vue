<script setup>
import axios from "axios";

import { useRouter } from "vue-router";

import { ref, computed, onMounted, watch, vModelCheckbox } from "vue";

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

const component = computed(() => {
  if (typeOfContent.value === "artworks") {
    return ArtworkCard;
  } else if (typeOfContent.value === "artists") {
    return ArtistCard;
  }
});

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
let guests = ref(false);

// let typeOfContent define the params and display them inside the dom with a includes or something like a dictionnary
let params = ref();

// watcher execute once after moving to another page -> he watch the ref be reseted ?!
watch([genres, keywords, productionYear, q, shootingPlace, type, guests], () => {
  // prevent the observer to fetch at the same time
  observer.unobserve(watcher.value);

  // authorized path to execute router
  let paths = ["/artists", "/artworks"]

  // can filter only defined parameters for a cleanest URL
  if (paths.includes(router.currentRoute.value.path)) {
    router.push({ path: typeOfContent.value, query: { ...params.value } });
  }

  // getContent(typeOfContent.value, params.value);

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

function getTypes() {
  const types = ["films", "installation", "performance"];

  const sortedTypes = types.sort((a, b) => a.localeCompare(b));

  defType.value = sortedTypes;
}
getTypes();

async function getKeywords() {
  try {
    const response = await axios.get("production/artwork-keywords");

    const data = response.data;

    const keywordsName = data.map((keyword) => {
      return keyword["name"];
    });

    const sortedKeywords = keywordsName.sort((a, b) => a.localeCompare(b));

    defKeywords.value = sortedKeywords;
  } catch (err) {
    console.error(err);
  }
}
getKeywords();

// each time the watcher intersecting fetch a new load of artworks
const handleObserver = (entries) => {
  entries.forEach(async (entry) => {
    // console.log(entry);
    // console.log(load.value);

    // console.info("watcher");

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    }

    async function watcherWorker() {
      // console.log("entry", entry);

      // setTimeout(async () => {
      //   console.log(isInViewport(watcher.value));
      //   await getContent(typeOfContent.value, params.value);
      // }, 1000);

      if (entry.isIntersecting) {
        // await getContent(typeOfContent.value, params.value);

        // set an return if no next page (For now based on if a request not results)

        if (isInViewport(watcher.value)) {
          // check before get content the load value
          if (!load.value) {
            return;
          }

          await getContent(typeOfContent.value, params.value);

          // and check after the getContent
          if (load.value) {
            return watcherWorker();
          }
        }
      }
      return;
    }
    watcherWorker();

    // if (load.value && entry.isIntersecting) {
    //   // observer cause duplicate request sometimes
    //   await getContent(typeOfContent.value, params.value);
    // } else if (!load.value && entry.intersectionRatio === 1) {
    //   // intersectingRatio equal to the ration visible of the watcher 1 indicate that is it full visible in the page
    //   // this is for avoid the watcher to be full visible in the beginning and block the infinite scroll
    //   // [BUG] but for small size load to because the page load with nothing from the beginning -> maybe check if artworks is not empty
    //   offset.value++;
    //   await getContent(typeOfContent.value, params.value);
    //   offset.value--;
    // }
  });
};

const observer = new IntersectionObserver(handleObserver);

function setup() {
  // name or path to set default content
  typeOfContent.value = router.currentRoute.value.path.replace("/", "");
  contents.value = [];
  offset.value = 1;
  load.value = true;

  let queries = router.currentRoute.value.query;
  // let queriesArr = Object.keys(queries).map((key) => queries[key]);

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
      guests
    };
  }

  // set default value if present in queries
  for (let param in params.value) {
    queries[param]
      ? (params.value[param] = queries[param])
      : (params.value[param] = null);
  }

  // if (queriesArr.every((value) => value === null)) {
  //   getContent(typeOfContent.value, params.value);
  // }

  // set the observer
  observer.observe(watcher.value);
}

onMounted(() => {
  setup();
});

// refresh content when changing type (artworks, artists)
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    // need to dismount the observer to remount another one and prevent observer to not work
    observer.unobserve(watcher.value);

    setup();
  }
);

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
      :title="typeOfContent === 'artworks' ? 'Œuvres' : 'Artistes'"
      :uppercase="true"
      :underlineSize="1"
      :fontSize="1"
    />
    <!-- fluid grid -->
    <div class="mb-6 flex items-center flex-wrap gap-6">
      <h3 class="text-lg font-medium text-gray-dark">Filtres :</h3>
      <!-- TODO need to update to a dynamic way of display filters -->
      <UiSelect
        v-if="params && Object.keys(params).includes('productionYear')"
        :options="defProductionYear"
        defaultValue="toutes dates"
        :selectedValue="productionYear"
        desc="Date de production"
        @update:option="(newValue) => (productionYear = newValue)"
      ></UiSelect>

      <!-- <UiSelect
        v-if="params && Object.keys(params).includes('nationality')"
        :options="defNationality"
        defaultValue="toutes nationalités"
        :selectedValue="nationality"
        desc="Nationalité"
        @update:option="(newValue) => (nationality = newValue)"
      ></UiSelect> -->

      <label v-if="params && Object.keys(params).includes('guests')" for="checkbox" class="relative inline-flex items-center gap-2">
        Artistes invités
        <div class="relative h-4 flex items-center justify-center">
          <input
            v-model="guests"
            name="guests"
            type="checkbox"
            class="peer appearance-none w-4 h-4 border border-black cursor-pointer rounded"
          />
          <span class="peer-checked:block hidden absolute origin-left -rotate-[55deg] top-[65%] left-1/2 w-full h-[2px] bg-black outline outline-white rounded-3xl pointer-events-none"></span>
          <span class="peer-checked:block hidden absolute origin-left -rotate-[130deg] top-[65%] left-1/2 w-1/2 h-[2px] bg-black rounded-3xl pointer-events-none"></span>
          <!-- <span class="peer-checked:block hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black pointer-events-none rounded-sm"></span> -->
        </div>
      </label>

      <!-- <UiSelect
        v-if="params && Object.keys(params).includes('genres')"
        :options="defGenres"
        defaultValue="tout genres"
        :selectedValue="genres"
        desc="Genres"
        @update:option="(newValue) => (genres = newValue)"
      ></UiSelect> -->

      <UiSelect
        v-if="params && Object.keys(params).includes('keywords')"
        :options="defKeywords"
        defaultValue="aucun"
        :selectedValue="keywords"
        desc="Keywords"
        @update:option="(newValue) => (keywords = newValue)"
      ></UiSelect>

      <!-- <UiSelect
        v-if="params && Object.keys(params).includes('shootingPlace')"
        :options="defShootingPlace"
        defaultValue="tout"
        :selectedValue="shootingPlace"
        desc="Lieu de tournage"
        @update:option="(newValue) => (shootingPlace = newValue)"
      ></UiSelect> -->

      <UiSelect
        v-if="params && Object.keys(params).includes('type')"
        :options="defType"
        defaultValue="tout type"
        :selectedValue="type"
        desc="Type"
        @update:option="(newValue) => (type = newValue)"
      ></UiSelect>

      <!-- <FilterSearch
        :query="q"
        @update:modelValue="(newValue) => (q = newValue)"
      ></FilterSearch> -->
    </div>
    <span class="my-3 w-full h-0.5 block bg-gray-extralight"></span>

    <div>
      <ul
        class="pb-12 grid lg:grid-cols-fluid-14-lg grid-cols-fluid-14 flex-grow-0 gap-3"
      >
        <li class="" v-for="content in contents" :key="content">
          <!-- <ArtworkCard
            :url="content.url"
            :picture="removePreprod(content.picture)"
            :title="content.title"
          /> -->
          <component
            :is="component"
            :artist="content"
            :url="content.url"
            :picture="removePreprod(content.picture)"
            :title="content.title"
          ></component>
        </li>
        <span ref="watcher" id="watcher" class="block w-full h-full"></span>
      </ul>
    </div>
  </main>
</template>

<style scoped></style>
