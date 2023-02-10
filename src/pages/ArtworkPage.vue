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
let galleries = ref({});
let genres = ref([]);
let events = ref([]);

async function getArtwork(id) {
  let response = await fetch(`${storeApi.restUriV2}production/artwork/${id}`);
  let data = await response.json();
  artwork.value = data;

  getAuthors(data.authors[0]);

  function getGalleries() {
    galleries.value.processGalleries = [];
    data.process_galleries.forEach((el) => {
      getGallery(el, galleries.value.processGalleries);
    });

    galleries.value.mediationGalleries = [];
    data.mediation_galleries.forEach((el) => {
      getGallery(el, galleries.value.mediationGalleries);
    });

    galleries.value.inSituGalleries = [];
    data.in_situ_galleries.forEach((el) => {
      getGallery(el, galleries.value.inSituGalleries);
    });

    galleries.value.pressGalleries = [];
    data.press_galleries.forEach((el) => {
      getGallery(el, galleries.value.pressGalleries);
    });

    galleries.value.teaserGalleries = [];
    data.teaser_galleries.forEach((el) => {
      getGallery(el, galleries.value.teaserGalleries);
    });
  }
  getGalleries();

  getGenres(data.genres);

  getDiffusions(data.diffusion);
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

async function getGallery(url, output) {
  let response = await fetch(url);
  let data = await response.json();

  data.mediaData = [];

  // Check index of data.media for push in galleries only when all media is here
  // prevent multipushing and duplicate medias
  let index = 1;

  data.media.forEach((el) => {
    getMedia(el, data, output);
  });

  async function getMedia(url, galleryData, output) {
    let response = await fetch(url);
    let data = await response.json();

    galleryData.mediaData.push(data);

    if (index === galleryData.media.length) {
      output.push(galleryData);
    } else {
      index++;
    }
  }
}

function getGenres(data) {
  data.forEach((genre) => {
    async function getGenre(genre) {
      let response = await fetch(genre);
      let data = await response.json();

      genres.value.push(data);
    }
    getGenre(genre);
  });
}

function getDiffusions(diffusions) {
  diffusions.forEach((diffusion) => {
    getDiffusion(diffusion);
  });

  async function getDiffusion(diffusion) {
    let response = await fetch(diffusion);
    let data = await response.json();
    getEvent(data.event);

    async function getEvent(event) {
      let response = await fetch(event);
      let data = await response.json();

      events.value.push(data);
    }
  }
}

// Need to remove this and all element using this function for Prod
function removePreprod(url) {
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
    <div class="pl-8 pr-6 py-5 w-3/5 flex flex-col gap-10">
      <section class="flex flex-col gap-6">
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
      </section>

      <section class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          :title="!events[2] ? 'Diffusion' : 'Diffusions'"
          :underlineSize="1"
          :fontSize="2"
        />

        <ul v-for="event in events" :key="event.title">
          <li>— {{ event.title }}</li>
        </ul>
      </section>

      <section class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Description"
          :underlineSize="1"
          :fontSize="2"
        />

        <UiDescription
          :desc_fr="artwork.description_fr"
          :desc_en="artwork.description_en"
        />
      </section>

      <section class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Crédits"
          :underlineSize="1"
          :fontSize="2"
        />

        <UiDescription
          :desc_fr="artwork.credits_fr"
          :desc_en="artwork.credits_en"
        />
      </section>

      <section class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Remerciement"
          :underlineSize="1"
          :fontSize="2"
        />

        <UiDescription
          :desc_fr="artwork.thanks_fr"
          :desc_en="artwork.thanks_en"
        />
      </section>
    </div>

    <!-- Set to scroll indepentently but can scroll with the entire page -->
    <div
      class="pl-8 pr-6 pt-5 pb-40 sticky top-16 w-2/5 h-screen overflow-x-scroll flex flex-col gap-6"
    >
      <div
        v-if="genres[0] && genres[0].label !== '.'"
        class="mb-10 flex flex-col gap-6"
      >
        <UnderlineTitle
          class="w-max"
          title="Genres"
          subtitle="Artist"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <div v-for="genre in genres" :key="genre" class="w-full flex flex-col">
          <div class="p-2 flex gap-1">
            <h6
              v-if="genre.label !== '.'"
              class="px-2 py-1 bg-gray-extralight text-xs font-medium rounded"
            >
              {{ genre.label }}
            </h6>
          </div>
          <span class="block w-full h-1 bg-black"></span>
        </div>
      </div>

      <div v-if="galleries.teaserGalleries[0]" class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Teaser"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul
          v-for="gallery in galleries.teaserGalleries"
          :key="gallery"
          class="grid grid-cols-2 gap-3"
        >
          <li v-for="media in gallery.mediaData" :key="media">
            <UiMedia
              :url="removePreprod(media.picture)"
              :medium="media.medium_url"
              :title="`${media.label} : (${gallery.description})`"
            />
          </li>
        </ul>
      </div>

      <div v-if="galleries.inSituGalleries[0]" class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="In Situ"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul
          v-for="gallery in galleries.inSituGalleries"
          :key="gallery"
          class="grid grid-cols-2 gap-3"
        >
          <li v-for="media in gallery.mediaData" :key="media">
            <UiMedia
              :url="removePreprod(media.picture)"
              :medium="media.medium_url"
              :title="`${media.label} : (${gallery.description})`"
            />
          </li>
        </ul>
      </div>

      <div v-if="galleries.processGalleries[0]" class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Processus"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul
          v-for="gallery in galleries.processGalleries"
          :key="gallery"
          class="grid grid-cols-2 gap-3"
        >
          <li v-for="media in gallery.mediaData" :key="media">
            <UiMedia
              :url="removePreprod(media.picture)"
              :medium="media.medium_url"
              :title="`${media.label} : (${gallery.description})`"
            />
          </li>
        </ul>
      </div>

      <div v-if="galleries.pressGalleries[0]" class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Press"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul
          v-for="gallery in galleries.pressGalleries"
          :key="gallery"
          class="grid grid-cols-2 gap-3"
        >
          <li v-for="media in gallery.mediaData" :key="media">
            <UiMedia
              :url="removePreprod(media.picture)"
              :medium="media.medium_url"
              :title="`${media.label} : (${gallery.description})`"
            />
          </li>
        </ul>
      </div>

      <div v-if="galleries.mediationGalleries[0]" class="flex flex-col gap-6">
        <UnderlineTitle
          class="w-max"
          title="Médiation"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul
          v-for="gallery in galleries.mediationGalleries"
          :key="gallery"
          class="grid grid-cols-2 gap-3"
        >
          <li v-for="media in gallery.mediaData" :key="media">
            <UiMedia
              :url="removePreprod(media.picture)"
              :medium="media.medium_url"
              :title="`${media.label} : (${gallery.description})`"
            />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
