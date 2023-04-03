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
const { artist, user, artwork, student } = getArtistInfo(artistId, token);
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
        class="pl-8 pr-6 py-5 lg:w-3/5 lg:flex"
        :class="{ flex: responsive === false, hidden: responsive === true }"
      >
        <div class="flex flex-col gap-10">
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

          <div v-if="!token" class="flex gap-6">
            <!-- {{ user?.profile }} -->

            <div class="w-1/2 flex flex-col gap-3">
              <UnderlineTitle
                class="w-max"
                title="Contact"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              />
              <ul class="flex flex-col">
                <li class="inline-flex gap-2">
                  <div class="inline-flex gap-1">
                    <b>Nom:</b>
                    <p v-if="user?.last_name">
                      {{ user.last_name }}
                    </p>
                  </div>
                  <div class="inline-flex gap-1">
                    <b>Prénom:</b>
                    <p v-if="user?.first_name">
                      {{ user.first_name }}
                    </p>
                  </div>
                </li>
                <li class="inline-flex gap-1">
                  <b>Nationalité:</b>
                  <p v-if="user?.profile?.nationality">
                    {{ user.profile.nationality }}
                  </p>
                </li>
                <li class="inline-flex gap-1">
                  <h5 class="font-bold">Tel:</h5>
                  <p v-if="user?.profile?.residence_phone">
                    {{ user.profile.nationality }}
                  </p>
                </li>
                <li class="inline-flex gap-1">
                  <h5 class="font-bold">E-Mail:</h5>
                  <p v-if="user?.profile?.nationality">
                    {{ user.profile.nationality }}
                  </p>
                </li>
                <li class="inline-flex gap-1">
                  <h5 class="font-bold">Adresse:</h5>
                  <p v-if="user?.profile?.residence_address">
                    {{ user.profile.residence_address }}
                  </p>
                </li>
                <li class="inline-flex gap-1">
                  <h5 class="font-bold">N° sécurité sociale:</h5>
                  <p v-if="user?.profile?.social_insurance_number">
                    {{
                      formatSocialNumber(user.profile.social_insurance_number)
                    }}
                  </p>
                </li>
              </ul>
            </div>

            <div class="w-1/2 flex flex-col gap-3">
              <UnderlineTitle
                class="w-max"
                title="Cursus"
                :uppercase="true"
                :underlineSize="1"
                :fontSize="2"
              />

              <!-- <UiDescription
                v-if="user?.profile?.cursus"
                :desc_fr="user?.profile?.cursus"
                desc_en=""
              /> -->

              <p v-if="user?.profile?.cursus" class="text-sm">
                {{ user?.profile?.cursus }}
              </p>
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
        class="pl-8 pr-6 py-5 sticky top-16 w-full lg:w-2/5 h-screen overflow-x-scroll lg:flex flex-col gap-6"
        :class="{ flex: responsive === true, hidden: responsive === false }"
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
