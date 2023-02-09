<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "@/stores/configApi";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiLink from "@/components/ui/UiLink.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import UiMedia from "@/components/ui/UiMedia.vue";

const router = useRouter();
const storeApi = useConfigApi();

let artwork = ref();
let authors = ref();
let authorsName = ref();
let processGalleries = ref([]);
let inSituGalleries = ref([]);

async function getArtwork(id) {
  let response = await fetch(`${storeApi.restUriV2}production/artwork/${id}`);
  let data = await response.json();
  artwork.value = data;

  getAuthors(data.authors[0]);

  data.process_galleries.forEach((el) => {
    getGallery(el, processGalleries.value);
  });

  data.in_situ_galleries.forEach((el) => {
    getGallery(el, inSituGalleries.value);
  });
}

// Work for only 1 authors for now
async function getAuthors(url) {
  let response = await fetch(url);
  let data = await response.json();
  authors.value = data;

  if (data.nickname) {
    authorsName.value = data.nickname;
    return;
  }
  getUser(data.user);
}

async function getUser(url) {
  let response = await fetch(url);
  let data = await response.json();

  authorsName.value = `${data.first_name} ${data.last_name}`;
}

// Error If mulitple media we get only the last media, need forEach somewhere maybe
// or push()
async function getGallery(url, output) {
  let response = await fetch(url);
  let data = await response.json();

  data.media.forEach((el) => {
    getMedia(el, data, output);
  });

  async function getMedia(url, galleryData, output) {
    let response = await fetch(url);
    let data = await response.json();

    // Push() here instead of force data
    galleryData.mediaData = data;
    output.push(galleryData);
  }
}

function removePreprod(url) {
  console.log(url);
  return url.replace("preprod.", "");
}

onMounted(() => {
  const artworkId = router.currentRoute.value.params.id;

  getArtwork(artworkId);
});
</script>

<template>
  <main
    v-if="artwork"
    class="pt-2 pr-20 pb-2 w-full min-h-screen flex justify-between gap-10 divide-x"
  >
    <div class="pl-8 pr-6 py-5 w-3/5 flex flex-col gap-3">
      <img :src="removePreprod(artwork.picture)" alt="" />

      <UnderlineTitle
        class="w-max"
        :title="artwork.title"
        :underlineSize="1"
        :fontSize="1"
      />

      <h3 class="flex items-center text-xl">
        <h3>{{ artwork.type }} de</h3>
        <UiLink
          v-if="authorsName"
          :text="authorsName"
          :url="`/artist/${storeApi.getId(authors.url)}`"
        />
        —
        {{ artwork.production_date.split("-")[0] }}
      </h3>

      <UiDescription
        :desc_fr="artwork.description_fr"
        :desc_en="artwork.description_en"
      />
      <h3 class="font-bold">Process</h3>
      {{ processGalleries }}
      <h3 class="font-bold">In Situ</h3>
      {{ inSituGalleries }}

      <h3 class="font-bold">Credit fr</h3>
      <p>{{ artwork.credits_fr }}</p>
      <p>{{ artwork }}</p>
    </div>

    <div
      class="pl-8 pr-6 py-5 sticky top-16 w-2/5 h-screen overflow-x-scroll flex flex-col gap-6"
    >
      <UnderlineTitle
        class="w-max"
        title="Oeuvres"
        subtitle="Artist"
        :uppercase="true"
        :underlineSize="1"
        :fontSize="2"
      />
      <ul class="grid grid-cols-2 gap-3">
        <!-- Make a function for get galleries and fetch medias -->
        <li><UiMedia :url="removePreprod(artwork.picture)" title="title" /></li>
      </ul>

      <UnderlineTitle
        class="w-max"
        title="Processus"
        subtitle="Artist"
        :uppercase="true"
        :underlineSize="1"
        :fontSize="2"
      />
      <ul class="grid grid-cols-2 gap-3">
        <li v-for="gallery in processGalleries" :key="gallery">
          <UiMedia
            :url="removePreprod(gallery.mediaData.picture)"
            :title="`${gallery.mediaData.label} : (${gallery.description})`"
          />
        </li>
      </ul>

      <UnderlineTitle
        class="w-max"
        title="In Situ"
        subtitle="Artist"
        :uppercase="true"
        :underlineSize="1"
        :fontSize="2"
      />
      <ul class="grid grid-cols-2 gap-3">
        <li v-for="gallery in inSituGalleries" :key="gallery">
          <UiMedia
            :url="removePreprod(gallery.mediaData.picture)"
            :title="`${gallery.mediaData.label} : (${gallery.description})`"
          />
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped></style>
