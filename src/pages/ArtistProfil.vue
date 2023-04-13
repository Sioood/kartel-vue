<script setup>
import { useRouter } from "vue-router";

import { ref } from "vue";

/**

  Composables

**/
import { getArtistInfo } from "@/composables/artist/getArtistInfo";
import { getId } from "@/composables/getId";

/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import ArtworkCard from "@/components/artwork/ArtworkCard.vue";

const router = useRouter();

const artistId = router.currentRoute.value.params.id;

let token = !localStorage.getItem("token");

// refs from the composable
// auth is true for now because method to verif auth is not created
const { artist, user, artwork, student, candidature } = getArtistInfo(
  artistId,
  token
);
let responsive = ref(false);

/**
 *
 *  @params {number} number - the social insurance number
 *
 */
const formatSocialNumber = (number) => {
  number = number.toString().split("");

  const spaces = ["1", "4", "7", "10", "14", "18"];

  for (let space of spaces) {
    number.splice(space, 0, " ");
  }

  return number.toString().replaceAll(",", "");
};

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
    class="pt-2 lg:pr-20 pb-2 w-full min-h-screen flex flex-col gap-1 lg:gap-5 divide-y lg:divide-y-0"
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
      class="pt-2 pb-2 w-full min-h-screen flex flex-col lg:flex-row justify-between gap-10 divide-x"
    >
      <div class="pl-8 pr-6 py-5 lg:w-3/5 flex flex-col">
        <div id="content" class="flex flex-col gap-10">
          <div class="flex items-end gap-6">
            <img
              v-if="user?.profile?.photo"
              class="w-1/3 object-cover"
              :src="user.profile.photo"
              :alt="`Photo de ${user.first_name} ${user.last_name}`"
            />

            <div class="w-2/3 flex flex-col">
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
                v-else-if="user && !artist.nickname"
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

          <!-- need a method which check the validity of the token instead of just verify it existence -->
          <div v-if="!token" class="flex flex-wrap gap-6">
            <div class="flex flex-col gap-3 flex-[1_1_20rem]">
              <UnderlineTitle
                class="w-max"
                title="Contact"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              />
              <ul class="flex flex-col">
                <li class="inline-flex gap-2">
                  <div class="flex flex-wrap gap-1">
                    <b>Nom:</b>
                    <p v-if="user?.last_name">
                      {{ user.last_name }}
                    </p>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <b>Prénom:</b>
                    <p v-if="user?.first_name">
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
                </li>
                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">E-Mail:</h5>
                  <p v-if="user?.email">
                    {{ user.email }}
                  </p>
                </li>
                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">Adresse:</h5>
                  <p v-if="user?.profile?.residence_address">
                    {{ user.profile.residence_address }}
                  </p>
                </li>
                <li class="flex flex-wrap gap-1">
                  <h5 class="font-bold">N° sécurité sociale:</h5>
                  <p v-if="user?.profile?.social_insurance_number">
                    {{
                      formatSocialNumber(user.profile.social_insurance_number)
                    }}
                  </p>
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
                      {{ candidature?.curriculum_vitae }}
                    </a>
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
                      {{ candidature?.identity_card }}
                    </a>
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
                      {{ candidature?.free_document }}
                    </a>
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
                      {{ candidature?.presentation_video }}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div class="flex flex-col gap-3 flex-[1_1_20rem]">
              <details class="group peer">
                <summary
                  class="group relative flex items-center gap-3 cursor-pointer"
                >
                  <UnderlineTitle
                    title="Cursus"
                    :underlineSize="1"
                    :fontSize="2"
                  />
                  <div class="relative w-5 h-5 border-0.5 border-gray rounded">
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
                class="relative max-h-52 peer-open:max-h-full peer-open:after:hidden truncate after:block after:absolute after:bottom-0 after:w-full after:h-1/2 after:bg-gradient-to-t after:from-white after:to-transparent after:pointer-events-none"
              >
                <p
                  v-if="user?.profile?.cursus"
                  class="text-sm whitespace-pre-line"
                  v-html="user?.profile?.cursus"
                ></p>
              </div>
            </div>
          </div>

          <UiDescription
            v-if="artist"
            :desc_fr="artist.bio_fr"
            :desc_en="artist.bio_en"
          />
        </div>
      </div>

      <div
        v-if="artwork"
        id="artwork"
        class="pl-8 pr-6 py-5 sticky top-16 w-full lg:w-2/5 lg:h-screen lg:overflow-x-scroll flex flex-col gap-6"
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
          title="Oeuvres"
          subtitle="Artist"
          :uppercase="true"
          :underlineSize="1"
          :fontSize="2"
        />
        <ul class="grid grid-cols-2 gap-3">
          <!-- {{ artwork }} -->
          <li v-for="artwork in artwork" :key="artwork.url">
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
