<script setup>
import config from "@/config";
import { useRouter } from "vue-router";

import { ref, onMounted, watch } from "vue";

import { marked } from "marked";

/**

  Composables

**/
import {
  artist,
  user,
  artworks,
  websites,
  student,
  candidature,
  setup,
} from "@/composables/artist/getArtistInfo";
import { getId } from "@/composables/getId";

/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import ArtworkCard from "@/components/artwork/ArtworkCard.vue";

import UiLink from "@/components/ui/UiLink.vue";

import userPlaceholder from "@/assets/placeholder_user.svg";

const router = useRouter();

let artistId = router.currentRoute.value.params.id;

let token = !!localStorage.getItem("token");

// refs from the composable
// auth is true for now because method to verif auth is not created
// const { artist, user, artwork, student, candidature, setup } = getArtistInfo(
//   artistId,
//   token
// );
let responsive = ref(false);

/**
 *
 *  @params {number} number - the social insurance number
 *
 */
const formatSocialNumber = (number) => {
  const socialNumberRegex =
    /\S{1}\s{1}\S{2}\s{1}\S{2}\s{1}\S{2}\s{1}\S{3}\s{1}\S{3}\s{1}\S{2}/gm;

  if (number.match(socialNumberRegex)) {
    return number;
  }

  number = number.toString().split("");

  const spaces = ["1", "4", "7", "10", "14", "18"];

  for (let space of spaces) {
    number.splice(space, 0, " ");
  }

  return number.toString().replaceAll(",", "");
};

/**
 * parsed raw description from markdown or html (or both) and parse it
 * @param {string} content - desc from props via bio.data
 */
function parsedContent(content) {
  return marked(content);
}

function formatUrlToText(url) {
  const filenameRegex = /\S{0,}[.]\S{0,}/gm;

  const split = url.split("/");

  if (!!split[split.length - 1].match(filenameRegex)) {
    return split[split.length - 1];
  }

  return url;
}

onMounted(() => {
  setup(artistId, token);
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

    artistId = router.currentRoute.value.params.id;
    setup(artistId, token);
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
  <!-- Student profile can be a component for artworks to -->
  <!-- Need 2 differents system because artworks and media is not the same importance and not the same amount of info -->
  <!-- Need to pass props before initialization ? -->
  <!-- like title, subtitle, desc/bio fr & en, Artworks / Medias -->
  <!-- and another component can be create for media selected -->

  <!-- max h-screen ?? -> overflow scroll for component ? -->
  <main
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
        href="#artwork"
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
      <div class="pl-8 pr-6 pt-5 pb-12 lg:w-3/5 flex flex-col">
        <div id="content" class="flex flex-col gap-10">
          <div class="flex flex-col lg:flex-row lg:items-end gap-6">
            <div class="relative w-fit h-full flex">
              <img
                v-if="user?.profile"
                class="min-h-[25vh] bg-black-extralightest object-cover"
                :class="{ 'p-5': !user?.profile?.photo }"
                :src="
                  user?.profile?.photo
                    ? `${config.media_service}?url=${user.profile.photo}&mode=adapt&w=1000&fmt=jpg`
                    : userPlaceholder
                "
                :alt="`Photo de ${user.first_name} ${user.last_name}`"
              />
              <svg
                v-if="student?.graduate"
                class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2L0 9L12 16L22 10.1667V17.5H24V9L12 2Z M3.99902 13.4905V18.0001C5.82344 20.429 8.72812 22.0001 11.9998 22.0001C15.2714 22.0001 18.1761 20.429 20.0005 18.0001L20.0001 13.4913L12.0003 18.1579L3.99902 13.4905Z"
                ></path>
              </svg>
            </div>

            <div v-if="artist" class="w-2/3 flex flex-col">
              <!-- <h4 v-if="user?.profile?.nationality" class="font-medium">
                {{ user.profile.nationality }}
              </h4> -->
              <UnderlineTitle
                class="w-max"
                v-if="artist?.nickname"
                :title="`''${artist.nickname}''`"
                subtitle="Artist"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              ></UnderlineTitle>

              <UnderlineTitle
                class="w-max"
                v-else-if="
                  user?.first_name && user?.last_name && !artist.nickname
                "
                :title="`${user.first_name} ${user.last_name}`"
                subtitle="Artist"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              ></UnderlineTitle>

              <h4 v-if="student?.promotion?.name">
                Promotion
                <router-link
                  :to="`/school/promotion/${getId(student.promotion.url)}`"
                  class="underline"
                >
                  {{ student.promotion.name }}
                </router-link>
              </h4>
            </div>
          </div>

          <div
            v-if="websites && websites.length !== 0"
            class="flex flex-col gap-3"
          >
            <UnderlineTitle
              class="w-max"
              title="Sites et liens"
              :uppercase="true"
              :underlineSize="1"
              :fontSize="2"
            />

            <ul class="flex flex-col gap-2">
              <li class="" v-for="website in websites" :key="website.id">
                <a :href="website.link" class="underline" target="_blank">
                  {{ website.title_fr || website.title_en }}
                </a>
              </li>
            </ul>
          </div>

          <!-- need a method which check the validity of the token instead of just verify it existence -->
          <div v-if="token" class="flex flex-wrap gap-6">
            <div class="flex flex-col gap-3 flex-[1_1_20rem]">
              <UnderlineTitle
                class="w-max"
                title="Contact"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              />
              <ul class="flex flex-col">
                <li v-if="artist?.nickname" class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>Pseudonyme:</b>
                    <p>
                      {{ artist.nickname }}
                    </p>
                  </div>
                </li>

                <li
                  v-else-if="user?.first && user?.last_name"
                  class="inline-flex gap-2"
                >
                  <div class="flex flex-wrap gap-1">
                    <b>Nom:</b>
                    <p>
                      {{ user.last_name }}
                    </p>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <b>Prénom:</b>
                    <p>
                      {{ user.first_name }}
                    </p>
                  </div>
                </li>

                <li v-else class="inline-flex gap-2">
                  <div v-if="user?.first_name" class="flex flex-wrap gap-1">
                    <b>Nom:</b>
                    <p>
                      {{ user.last_name }}
                    </p>
                  </div>
                  <div v-if="user?.last_name" class="flex flex-wrap gap-1">
                    <b>Prénom:</b>
                    <p>
                      {{ user.first_name }}
                    </p>
                  </div>
                </li>

                <li class="flex flex-wrap gap-1">
                  <b>Nationalité:</b>
                  <p
                    v-if="
                      user?.profile?.nationality ||
                      user?.profile?.homeland_country
                    "
                  >
                    {{
                      user?.profile?.nationality ||
                      user?.profile?.homeland_country
                    }}
                  </p>
                  <p v-else class="text-gray italic">Non renseigné.</p>
                </li>

                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">Tel:</h5>
                  <p
                    v-if="
                      user?.profile?.residence_phone ||
                      user?.profile?.homeland_phone
                    "
                  >
                    {{
                      user?.profile?.residence_phone ||
                      user?.profile?.homeland_phone
                    }}
                  </p>
                  <p v-else class="text-gray italic">Non renseigné.</p>
                </li>

                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">E-Mail:</h5>
                  <p v-if="user?.email">
                    {{ user.email }}
                  </p>
                  <p v-else class="text-gray italic">Non renseigné.</p>
                </li>

                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">Adresse:</h5>
                  <p v-if="user?.profile?.residence_address">
                    {{ user.profile.residence_address }}
                  </p>
                  <p v-else class="text-gray italic">Non renseigné.</p>
                </li>

                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">N° sécurité sociale:</h5>
                  <p v-if="user?.profile?.social_insurance_number">
                    {{
                      formatSocialNumber(user.profile.social_insurance_number)
                    }}
                  </p>
                  <p v-else class="text-gray italic">Non renseigné.</p>
                </li>
              </ul>
            </div>

            <div class="flex flex-col gap-3 flex-[1_1_20rem] break-all">
              <UnderlineTitle
                class="w-max"
                title="Autres informations"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              />

              <ul class="flex flex-col">
                <li class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>CV:</b>
                    <a
                      v-if="candidature?.curriculum_vitae"
                      :href="candidature?.curriculum_vitae"
                      class="underline"
                    >
                      {{ formatUrlToText(candidature?.curriculum_vitae) }}
                    </a>
                    <p v-else class="text-gray italic">Non renseigné.</p>
                  </div>
                </li>
                <li class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>Justificatif d'identité:</b>
                    <a
                      v-if="candidature?.identity_card"
                      :href="candidature?.identity_card"
                      class="underline"
                    >
                      {{ formatUrlToText(candidature?.identity_card) }}
                    </a>
                    <p v-else class="text-gray italic">Non renseigné.</p>
                  </div>
                </li>

                <UnderlineTitle
                  class="w-max mt-6 mb-3"
                  title="Dans le cadre de sa candidature:"
                  :uppercase="true"
                  :underlineSize="1"
                  :fontSize="4"
                />

                <li class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>Proposition initiale:</b>
                    <a
                      v-if="candidature?.considered_project_1"
                      :href="candidature?.considered_project_1"
                      class="underline"
                    >
                      1<sup>ère</sup> année
                    </a>
                    <span v-if="candidature?.considered_project_2">/</span>
                    <a
                      v-if="candidature?.considered_project_2"
                      :href="candidature?.considered_project_2"
                      class="underline"
                    >
                      2<sup>ème</sup> année
                    </a>
                    <p
                      v-else-if="
                        !candidature?.considered_project_1 &&
                        !candidature?.considered_project_2
                      "
                      class="text-gray italic"
                    >
                      Non renseigné.
                    </p>
                  </div>
                </li>
                <li class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>Document libre:</b>
                    <a
                      v-if="candidature?.free_document"
                      :href="candidature?.free_document"
                      class="underline"
                    >
                      {{ formatUrlToText(candidature?.free_document) }}
                    </a>
                    <p v-else class="text-gray italic">Non renseigné.</p>
                  </div>
                </li>
                <li class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>Vidéo de présentation de son travail:</b>
                    <a
                      v-if="candidature?.presentation_video"
                      :href="candidature?.presentation_video"
                      class="underline"
                    >
                      {{ formatUrlToText(candidature?.presentation_video) }}
                    </a>
                    <p v-else class="text-gray italic">Non renseigné.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="w-full flex flex-col gap-3 flex-[1_1_20rem]">
              <details class="group peer">
                <summary
                  class="group relative flex items-center gap-3 cursor-pointer"
                >
                  <UnderlineTitle
                    title="Cursus"
                    :underlineSize="1"
                    :fontSize="2"
                  />
                  <div
                    v-if="user?.profile?.cursus"
                    class="relative w-5 h-5 border-0.5 border-gray rounded"
                  >
                    <span
                      class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-gray"
                    ></span>
                    <span
                      class="group-open:rotate-90 absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-gray transition-all"
                    ></span>
                  </div>
                </summary>
              </details>

              <div
                class="relative max-h-52 peer-open:max-h-full peer-open:after:hidden overflow-hidden"
                :class="{
                  ' after:block after:absolute after:bottom-0 after:w-full after:h-1/2 after:bg-gradient-to-t after:from-white after:to-transparent after:pointer-events-none':
                    user?.profile?.cursus,
                }"
              >
                <p
                  v-if="user?.profile?.cursus"
                  class="text-sm whitespace-pre-line [&>*]:whitespace-pre-line"
                  v-html="parsedContent(user?.profile?.cursus)"
                ></p>
                <p v-else class="text-gray italic">Non renseigné.</p>
              </div>
            </div>
          </div>

          <UiDescription
            v-if="artist?.bio_fr || artist?.bio_en"
            :desc_fr="artist.bio_fr"
            :desc_en="artist.bio_en"
          />
        </div>
      </div>

      <div
        v-if="artworks"
        id="artwork"
        class="pl-8 pr-6 py-5 sticky top-20 w-full lg:w-2/5 lg:h-[90svh] lg:overflow-y-auto flex flex-col gap-6"
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

        <UnderlineTitle
          class="w-max"
          title="Œuvres"
          subtitle="Artist"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul class="grid grid-cols-2 gap-3">
          <!-- {{ artwork }} -->
          <li v-for="artwork in artworks" :key="artwork.url">
            <ArtworkCard
              :url="artwork.url"
              :picture="removePreprod(artwork.picture)"
              :title="artwork.title"
            />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
