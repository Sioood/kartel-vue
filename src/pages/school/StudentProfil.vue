<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "../../stores/configApi";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";

const router = useRouter();
const storeApi = useConfigApi();

let artist = ref();
let student = ref();
let user = ref();

let bio = ref([]);

onMounted(() => {
  // the user came from promo -> students of the promo are stored in store
  // get the student with filter the store promo students

  // With too much query and params we have too much possibility of missing information
  // Need to redirect if one is missing, or just get the Student (User might be better) which have all the urls
  // For now router is setup to redirect "/artist/" to "/school/"
  const artistId = router.currentRoute.value.params.id;
  const studentId = router.currentRoute.value.query.student;

  // can combine both function with more function parameters...
  async function getStudent(id) {
    let response = await fetch(`${storeApi.restUriV2}school/student/${id}`);
    let data = await response.json();

    student.value = data;

    // Function if we get only Student for exemple and want to retrieve more info (User & Artist)
    async function getUser(id) {
      let response = await fetch(`${storeApi.restUriV2}people/user/${id}`);
      let data = await response.json();

      user.value = data;
    }

    let userId = storeApi.getId(student.value.user);
    getUser(userId);
  }

  async function getArtist(id) {
    let response = await fetch(`${storeApi.restUriV2}people/artist/${id}`);
    let data = await response.json();
    artist.value = data;

    bio.value.lang = "fr";
    bio.value.data = data.bio_fr;
  }

  // if (storeApi.promoStudents[0]) {
  //   storeApi.promoStudents.filter((student) => console.log(student));

  //   artist.value = storeApi.promoStudents.filter(
  //     (student) => storeApi.getId(student.artist) === Number(artistId)
  //   );

  //   student.value = storeApi.promoStudents.filter(
  //     (student) => storeApi.getId(student.url) === Number(studentId)
  //   );
  // } else {
  //   // fetch artist with router id
  //   getArtist(artistId);
  //   getStudent(studentId);
  // }
  getArtist(artistId);
  getStudent(studentId);
});
</script>

<template>
  <!-- Student profile can be a component for artworks to -->
  <!-- Need 2 differents system because artworks and media is not the same importance and not the same amount of info -->
  <!-- Need to pass props before initialization ? -->
  <!-- like title, subtitle, desc/bio fr & en, Artworks / Medias -->
  <!-- and another component can be create for media selected -->

  <!-- max h-screen ?? -> overflow scroll for component ? -->
  <main class="pt-12 pr-20 pb-10 w-full h-full flex justify-between gap-10">
    <div class="px-10 py-5 h-full w-1/2 max-w-md shadow-border">
      <!-- <p>{{ storeApi.promoStudents }}</p> -->
      <div class="flex flex-col gap-10">
        <UnderlineTitle
          class="w-max"
          title="General Info"
          :half="true"
          :underlineSize="2"
          :fontSize="1"
        ></UnderlineTitle>

        <UnderlineTitle
          class="w-max"
          v-if="artist && artist.nickname"
          :title="artist.nickname"
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

        <div class="w-full flex flex-col items-end text-sm" v-if="artist">
          <div class="p-4 w-full bg-gray-extralightest dark:bg-black-light">
            {{ bio.data }}
          </div>
          <div class="w-full h-1 bg-black dark:bg-white"></div>
          <div class="w-full flex justify-between">
            <div class="flex gap-2 font-bold">
              <!-- Underline only the selected (with dynamic class and ref) -->
              <button
                :class="{
                  underline: bio.lang === 'fr',
                }"
                @click="
                  bio.lang = 'fr';
                  bio.data = artist.bio_fr;
                "
              >
                FR
              </button>
              <button
                :class="{
                  underline: bio.lang === 'en',
                }"
                @click="
                  bio.lang = 'en';
                  bio.data = artist.bio_en;
                "
              >
                EN
              </button>
            </div>
            <h6 class="text-xs text-gray uppercase">Description</h6>
          </div>
        </div>

        <div
          class="w-full after:block after:w-full after:h-1 after:bg-black after:dark:bg-white"
        >
          <div class="flex items-end justify-between">
            <h2 class="p-2 text-2xl font-bold uppercase">Oeuvres</h2>
            <h6 class="text-xs text-gray">Sélectionner</h6>
          </div>
          <!-- Component Media -->
        </div>
      </div>
    </div>

    <div class="p-2 w-full text-sm">
      <h2 class="font-bold">Artist Profile</h2>
      <p>{{ artist }}</p>
      <h2 class="font-bold">Student Profile</h2>
      <p>{{ student }}</p>
      <h2 class="font-bold">User Profile</h2>
      <p>{{ user }}</p>
    </div>
  </main>
</template>

<style scoped></style>
