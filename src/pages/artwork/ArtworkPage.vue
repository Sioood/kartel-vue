<script setup>
/**
 * Config
 */
import config from "@/config";

/**
 * Modules
 */
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

/**
 * Composables
 */
import { getId } from "@/composables/getId";
import {
  getArtwork,
  artwork,
  authorsStore as authors,
  galleries,
  genres,
  events,
  initValues,
} from "@/composables/artwork/getArtwork";

/**
 * Components
 */
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiLink from "@/components/ui/UiLink.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import ArtworkGallery from "@/components/artwork/ArtworkGallery.vue";
import CreditsSection from "@/components/artwork/CreditsSection.vue";

const router = useRouter();

/**
 * @type {boolean} responsive - the status of the responsive menu
 */
let responsive = ref(false);

// Need to remove this and all element using this function for Prod
function removePreprod(url) {
  if (url) {
    return url.replace("preprod.", "");
  }
}

let gallery = ref();
let preview = ref();

onMounted(() => {
  // get the id of the artwork from the router param
  const artworkId = router.currentRoute.value.params.id;

  // and get the artwork with the id
  getArtwork(artworkId);

  Fancybox.bind(gallery.value, "[data-fancybox]");
  Fancybox.bind(preview.value, "[data-fancybox]");
});

// Save the first route which mount the component and store it
const routeName = router.currentRoute.value.name;
watch(
  () => router.currentRoute.value.path,
  () => {
    // if the route is not the same as the first, prevent a new setup call
    if (router.currentRoute.value.name !== routeName) {
      return;
    }

    initValues();

    const artworkId = router.currentRoute.value.params.id;

    getArtwork(artworkId);
  }
);

onBeforeUnmount(() => {
  initValues();
  Fancybox.destroy();
});
</script>

<template>
  <main
    v-if="artwork"
    class="lg:pr-20 w-full min-h-screen flex flex-col gap-1 lg:gap-5 divide-y lg:divide-y-0"
  >
    <div
      class="sticky z-10 top-14 w-full flex justify-around lg:hidden divide-x bg-white"
    >
      <a
        href="#content"
        @click="responsive = false"
        class="px-6 py-3 w-full text-xl font-bold hover:bg-gray-extralightest after:block after:w-full after:h-1 after:bg-black cursor-pointer"
        :class="{ 'bg-gray-extralightest': responsive === false }"
      >
        À propos
      </a>
      <a
        href="#galleries"
        @click="responsive = true"
        class="px-6 py-3 w-full text-xl font-bold hover:bg-gray-extralightest after:block after:w-full after:h-1 after:bg-black cursor-pointer"
        :class="{ 'bg-gray-extralightest': responsive === true }"
      >
        Média
      </a>
    </div>

    <div
      class="pb-2 w-full min-h-screen flex flex-col lg:flex-row justify-between gap-10 divide-x"
    >
      <div
        id="content"
        class="pl-8 pr-6 pt-5 pb-12 lg:w-3/5 flex flex-col gap-10"
      >
        <section class="flex flex-col gap-6" ref="preview">
          <img
            data-fancybox="preview"
            class="min-h-[30vh] bg-black-extralightest"
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

          <div class="flex flex-wrap items-center text-xl">
            <h3>{{ artwork.type }} de</h3>
            <div v-if="authors" class="flex">
              <div
                class="flex items-center"
                v-for="(author, index) in authors"
                :key="author"
              >
                <UiLink
                  class="[&>a]:px-0"
                  :text="author.username || author.nickname"
                  :url="`/artist/${getId(author.url)}`"
                />
                <span v-if="!(authors.length <= index + 1)">&</span>
              </div>
            </div>
            <span>—</span>
            <h3 v-if="artwork.production_date?.split('-')">
              {{ "&nbsp" + artwork.production_date?.split("-")[0] }}
            </h3>
          </div>
        </section>

        <section v-if="events && events[0]" class="flex flex-col gap-6">
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
            (artwork.collaborators && artwork.collaborators[0]) ||
            (artwork.partners && artwork.partners[0])
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
        ref="gallery"
        id="galleries"
        class="pl-8 pr-6 py-5 sticky top-20 lg:w-2/5 lg:h-[90svh] lg:overflow-y-auto flex flex-col gap-6"
      >
        <div class="lg:hidden flex flex-col">
          <hr />
          <UnderlineTitle
            class="w-max"
            title="Galleries"
            :uppercase="true"
            :underlineSize="1"
            :fontSize="1"
          />
        </div>

        <!-- vérfifier la length du mot, si moins de 3 lettres c'est pas un mot exploitable -->
        <div
          v-if="
            genres &&
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
          v-if="galleries.teaserGalleries && galleries.teaserGalleries[0]"
          :galleries="galleries.teaserGalleries"
          title="Teaser"
        />

        <ArtworkGallery
          v-if="galleries.inSituGalleries && galleries.inSituGalleries[0]"
          :galleries="galleries.inSituGalleries"
          title="In Situ"
        />

        <ArtworkGallery
          v-if="galleries.processGalleries && galleries.processGalleries[0]"
          :galleries="galleries.processGalleries"
          title="Process"
        />

        <ArtworkGallery
          v-if="galleries.pressGalleries && galleries.pressGalleries[0]"
          :galleries="galleries.pressGalleries"
          title="Press"
        />

        <ArtworkGallery
          v-if="galleries.mediationGalleries && galleries.mediationGalleries[0]"
          :galleries="galleries.mediationGalleries"
          title="Médiation"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
