<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "@/stores/configApi";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiLink from "@/components/ui/UiLink.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
// import ArtworkCard from "@/components/artwork/ArtworkCard.vue";

const router = useRouter();
const storeApi = useConfigApi();

let artwork = ref();
let authors = ref();
let authorsName = ref();

async function getArtwork(id) {
  let response = await fetch(`${storeApi.restUriV2}production/artwork/${id}`);
  let data = await response.json();
  artwork.value = data;

  getAuthors(data.authors[0]);
}

// Work for only 1 authors for now
async function getAuthors(url) {
  let response = await fetch(url);
  let data = await response.json();
  authors.value = data;
  console.log(data);
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
  console.log(authorsName.value);
}

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
    class="pt-2 pr-20 pb-2 w-full min-h-screen flex justify-between gap-10 divide-x"
  >
    <div v-if="artwork" class="flex flex-col">
      <img :src="removePreprod(artwork.picture)" alt="" />

      <UnderlineTitle
        class="w-max"
        :title="artwork.title"
        :underlineSize="1"
        :fontSize="1"
      />

      <h3 class="flex items-center text-xl">
        De
        <UiLink
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
      <p>{{ artwork }}</p>
    </div>
  </main>
</template>

<style scoped></style>
