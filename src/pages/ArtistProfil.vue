<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "@/stores/configApi";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import ArtworkCard from "@/components/artwork/ArtworkCard.vue";

const router = useRouter();
const storeApi = useConfigApi();

let artist = ref();
let artwork = ref();
let student = ref();
let user = ref();

let bio = ref([]);

onMounted(() => {
  const artistId = router.currentRoute.value.params.id;

  async function getArtist(id) {
    let response = await fetch(`${storeApi.restUriV2}people/artist/${id}`);
    let data = await response.json();
    artist.value = data;

    bio.value.lang = "fr";
    bio.value.data = data.bio_fr;
    getUser(storeApi.getId(data.user));
  }
  getArtist(artistId);

  async function getArtwork(id) {
    console.log("hello");
    let response = await fetch(
      `${storeApi.restUriV2}production/artwork?authors=${id}`
    );
    let data = await response.json();
    console.log(data);
    artwork.value = data;
    console.log("hello");
  }
  getArtwork(artistId);

  async function getUser(id) {
    let response = await fetch(`${storeApi.restUriV2}people/user/${id}`);
    let data = await response.json();

    user.value = data;
  }

  async function getStudent(id) {
    let response = await fetch(
      `${storeApi.restUriV2}school/student?artist=${id}`
    );
    let data = await response.json();
    student.value = data;
  }
  getStudent(artistId);
});
</script>

<template>
  <!-- Student profile can be a component for artworks to -->
  <!-- Need 2 differents system because artworks and media is not the same importance and not the same amount of info -->
  <!-- Need to pass props before initialization ? -->
  <!-- like title, subtitle, desc/bio fr & en, Artworks / Medias -->
  <!-- and another component can be create for media selected -->

  <!-- max h-screen ?? -> overflow scroll for component ? -->
  <main
    class="pt-2 pr-20 pb-2 w-full min-h-screen flex justify-between gap-10 divide-x"
  >
    <div class="pl-8 pr-6 py-5 w-3/5">
      <!-- <p>{{ storeApi.promoStudents }}</p> -->
      <div class="flex flex-col gap-10">
        <UnderlineTitle
          class="w-max"
          title="General Info"
          :underlineSize="2"
          :fontSize="1"
        ></UnderlineTitle>

        <UnderlineTitle
          class="w-max"
          v-if="artist && artist.nickname"
          :title="`''${artist.nickname}''`"
          subtitle="Artist"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        ></UnderlineTitle>

        <UnderlineTitle
          class="w-max"
          v-else-if="user && !artist.nickname"
          :title="`${user.first_name} ${user.last_name}`"
          subtitle="Artist"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        ></UnderlineTitle>

        <UiDescription
          v-if="artist"
          :desc_fr="artist.bio_fr"
          :desc_en="artist.bio_en"
        />

        <!-- Can be component to, props Title (Oeuvres or Média) -->
        <div>
          <div
            class="mb-2 w-full after:block after:w-full after:h-1 after:bg-black after:dark:bg-white"
          >
            <div class="flex items-end justify-between">
              <h2 class="p-2 text-2xl font-bold uppercase">Oeuvres</h2>
              <h6 class="text-xs text-gray">Sélectionner</h6>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <!-- set ring active with router id -->
            <ArtworkCard v-for="(el, index) in 8" :key="index" :index="index" />
          </div>
        </div>
        <div class="shadow-border">
          <h2 class="font-bold">artist</h2>
          <p>{{ artist }}</p>

          <h2 class="font-bold">artwork</h2>
          <p>{{ artwork }}</p>

          <h2 class="font-bold">user</h2>
          <p>{{ user }}</p>

          <h2 class="font-bold">student</h2>
          <p>{{ student }}</p>
        </div>
      </div>
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
        <li v-for="artwork in artwork" :key="artwork.url">
          <ArtworkCard :url="artwork.picture" :title="artwork.title" />
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped></style>