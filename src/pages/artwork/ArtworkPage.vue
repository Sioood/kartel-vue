<script setup>
import config from "@/config";

import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "@/stores/configApi";

/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiLink from "@/components/ui/UiLink.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import ArtworkGallery from "@/components/artwork/ArtworkGallery.vue";
import CreditsSection from "@/components/artwork/CreditsSection.vue";

const router = useRouter();
const storeApi = useConfigApi();

let artwork = ref();
let authors = ref();
let authorsName = ref();
let galleries = ref({});
let genres = ref([]);
let events = ref([]);

let responsive = ref(false);

// get artwork by current route id
async function getArtwork(id) {
  let response = await fetch(`${config.rest_uri_v2}production/artwork/${id}`);
  let data = await response.json();
  artwork.value = data;

  // get authors with only the first author for now
  getAuthors(data.authors[0]);

  // get all galleries -> can be refacto with a key include "galleries" and after split to Camel case
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

  /**
  
    get the rest of info for the artwork
  
  **/
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

// get user with api url
async function getUser(url) {
  let response = await fetch(url);
  let data = await response.json();

  return (authorsName.value = `${data.first_name} ${data.last_name}`);
}

// get specific gallery
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
  if (url) {
    return url.replace("preprod.", "");
  }
}

onMounted(() => {
  const artworkId = router.currentRoute.value.params.id;

  getArtwork(artworkId);
});
</script>

<template>
  <main
    v-if="artwork"
    class="pt-2 lg:pr-20 pb-2 w-full min-h-screen flex flex-col gap-1 lg:gap-5 divide-y lg:divide-y-0"
  >
    <div
      class="sticky z-10 top-14 w-full flex justify-around lg:hidden divide-x bg-white"
    >
      <h2
        @click="responsive = false"
        class="px-6 py-3 w-full text-xl font-bold hover:bg-gray-extralightest after:block after:w-full after:h-1 after:bg-black cursor-pointer"
        :class="{ 'bg-gray-extralightest': responsive === false }"
      >
        À propos
      </h2>
      <h2
        @click="responsive = true"
        class="px-6 py-3 w-full text-xl font-bold hover:bg-gray-extralightest after:block after:w-full after:h-1 after:bg-black cursor-pointer"
        :class="{ 'bg-gray-extralightest': responsive === true }"
      >
        Média
      </h2>
    </div>

    <div
      class="pt-2 pb-2 w-full min-h-screen flex justify-between gap-10 divide-x"
    >
      <div
        class="pl-8 pr-6 py-5 lg:w-3/5 flex flex-col gap-10"
        :class="{ flex: responsive === false, hidden: responsive === true }"
      >
        <section class="flex flex-col gap-6">
          <img
            :src="`${config.media_service}?url=${removePreprod(
              artwork.picture
            )}&mode=adapt&w=1000&fmt=jpg`"
            :srcset="`${config.media_service}?url=${removePreprod(
              artwork.picture
            )}&mode=adapt&w=500&fmt=jpg 500w,
          ${config.media_service}?url=${removePreprod(
              artwork.picture
            )}&mode=adapt&w=1000&fmt=jpg 1000w`"
            :alt="`preview picture of ${artwork.title}`"
            sizes="100vw"
          />
          <UnderlineTitle
            class="w-max"
            :title="artwork.title"
            :underlineSize="1"
            :fontSize="1"
          />

          <h3 class="flex flex-wrap items-center text-xl">
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

        <section v-if="events[0]" class="flex flex-col gap-6">
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

        <section
          v-if="artwork.description_fr || artwork.description_en"
          class="flex flex-col gap-6"
        >
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

        <section
          v-if="
            artwork.credits_fr ||
            artwork.credits_en ||
            artwork.collaborators[0] ||
            artwork.partners[0]
          "
          class="flex flex-col gap-6"
        >
          <UnderlineTitle
            class="w-max"
            title="Crédits"
            :underlineSize="1"
            :fontSize="2"
          />

          <CreditsSection
            :collaborators="artwork.collaborators"
            :partners="artwork.partners"
            :credits_fr="artwork.credits_fr"
            :credits_en="artwork.credits_en"
          />
        </section>

        <section
          v-if="artwork.thanks_fr || artwork.thanks_en"
          class="flex flex-col gap-6"
        >
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
        class="pl-8 pr-6 pt-5 pb-40 sticky top-16 lg:w-2/5 h-screen overflow-x-scroll lg:flex flex-col gap-6"
        :class="{ flex: responsive === true, hidden: responsive === false }"
      >
        <!-- vérfifier la length du mot, si moins de 3 lettres c'est pas un mot exploitable -->
        <div
          v-if="
            genres[0] &&
            genres.length === 1 &&
            genres[0].label.replaceAll(/.| [ ]/g, '') !== ''
          "
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
          <div
            v-for="genre in genres"
            :key="genre"
            class="w-full flex flex-col"
          >
            <div class="p-2 flex gap-1">
              <h6
                v-if="genre.label.replaceAll(/.| [ ]/g, '') !== ''"
                class="px-2 py-1 bg-gray-extralight text-xs font-medium rounded"
              >
                {{ genre.label }}
              </h6>
            </div>
            <span class="block w-full h-1 bg-black"></span>
          </div>
        </div>

        <ArtworkGallery
          v-if="galleries.teaserGalleries[0]"
          :galleries="galleries.teaserGalleries"
          title="Teaser"
        />

        <ArtworkGallery
          v-if="galleries.inSituGalleries[0]"
          :galleries="galleries.inSituGalleries"
          title="In Situ"
        />

        <ArtworkGallery
          v-if="galleries.processGalleries[0]"
          :galleries="galleries.processGalleries"
          title="Process"
        />

        <ArtworkGallery
          v-if="galleries.pressGalleries[0]"
          :galleries="galleries.pressGalleries"
          title="Press"
        />

        <ArtworkGallery
          v-if="galleries.mediationGalleries[0]"
          :galleries="galleries.mediationGalleries"
          title="Médiation"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
