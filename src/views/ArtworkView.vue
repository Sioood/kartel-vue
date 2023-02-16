<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "../stores/configApi";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import ArtworkCard from "@/components/artwork/ArtworkCard.vue";

const router = useRouter();
const storeApi = useConfigApi();

let artworks = ref([]);
let watcher = ref();
let load = ref(false);

//  get header for get next
let offset = ref(1);

let years = ref([]);
let year = ref();

// Get artworks, set an observer who fetch the next page
// update params if filters change
// if the filters change reset artworks
async function getArtworks(productionYear) {
  console.log(productionYear);
  load.value = false;

  let params = {
    productionYear: `production_year=${productionYear}`,
  };

  if (!productionYear) {
    params.productionYear = "";
  }

  let response = await fetch(
    `${storeApi.restUriV2}production/artwork?${params.productionYear}&page_size=20&page=${offset.value}`
  );

  let data = await response.json();
  console.log(data);
  data.forEach((artwork) => {
    artworks.value.push(artwork);
  });

  offset.value++;
  load.value = true;
}

function onChangeYear(productionYear) {
  if (productionYear === null) {
    router.push("");
  } else {
    router.push(`?year=${productionYear}`);
  }
  artworks.value = [];
  offset.value = 1;
  getArtworks(productionYear);
}

function getYears() {
  let max = new Date().getFullYear();
  let min = 1998;
  let number = max - (max - min);

  for (let i = max; i >= number; i--) {
    years.value.push(i);
  }
}
getYears();

const handleObserver = (entries) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (load.value && entry.isIntersecting) {
      getArtworks(year.value);
    }
  });
};

onMounted(() => {
  const routeYear = router.currentRoute.value.query.year;
  const observer = new IntersectionObserver(handleObserver);
  observer.observe(watcher.value);

  if (routeYear) {
    year.value = routeYear;
    getArtworks(routeYear);
  } else {
    year.value = null;
    getArtworks();
  }
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
        <label for="date" class="flex flex-col items-end">
          <div class="w-full after:block after:w-full after:h-1 after:bg-black">
            <select
              name="date"
              id="date"
              class="px-2 w-full after:block after:w-10 after:h-1 after:bg-black cursor-pointer"
              @change="onChangeYear(year)"
              v-model="year"
            >
              <option :value="null">toutes dates</option>
              <option :value="year" v-for="year in years" :key="year">
                {{ year }}
              </option>
            </select>
          </div>
          <h6 class="text-sm font-medium text-gray">Date de production</h6>
        </label>
      </div>
    </div>
    <span class="my-3 w-full h-0.5 block bg-gray-extralight"></span>
    <ul class="grid grid-cols-fluid-14 gap-3">
      <!-- {{ artwork }} -->
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
