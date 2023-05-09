<script setup>
import { useRouter } from "vue-router";

import { getId } from "@/composables/getId";

import { useConfigApi } from "../../stores/configApi";
import { onMounted, ref, watch } from "vue";

/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import PromotionStudents from "@/components/school/PromotionStudents.vue";

const router = useRouter();

const storeApi = useConfigApi();

let promoId = ref();
let promoSelected = ref(promoId);

watch(
  () => router.currentRoute.value.params.id,
  () => {
    const route = router.currentRoute.value.fullPath;

    if (route.includes("school/promotion")) {
      promoId.value = router.currentRoute.value.params.id;

      storeApi.getSelectedPromo(promoId.value);
    }
  }
);

function selectPromotion(id) {
  router.push(`/school/promotion/${id}`);
}

onMounted(async () => {
  promoId.value = router.currentRoute.value.params.id;

  if (!storeApi.promotions[0]) {
    await storeApi.getPromotions();

    // get the second most recent promotion (avoid the recent because sometimes it's the empty one)
    router.push(`/school/promotion/${getId(storeApi.promotions[1].url)}`);
  }

  storeApi.getSelectedPromo(promoId.value);
});
</script>

<!-- Rename to be Student / Artist view -> Promo list only for student or hidden with button for artist -->
<template>
  <main
    class="md:pr-20 w-full h-[91svh] flex flex-col md:flex-row md:divide-x divide-y md:divide-y-0"
  >
    <div class="md:sticky top-0 py-2 px-2 flex flex-col justify-between gap-4">
      <div class="p-2 flex flex-col gap-3">
        <UnderlineTitle
          class="[&:nth-child(1)>:nth-child(1)]:w-full"
          title="Promotions"
          subtitle="Sélectionner"
          :uppercase="false"
          :underlineSize="1"
          :fontSize="1"
        ></UnderlineTitle>

        <label for="" class="w-full flex flex-col items-end md:hidden">
          <div class="w-full after:block after:w-full after:h-1 after:bg-black">
            <select
              v-model="promoSelected"
              @change="selectPromotion(promoSelected)"
              class="w-full px-2 cursor-pointer"
              :class="{ 'text-gray': isNaN(promoSelected) }"
            >
              <option disabled :value="undefined">
                Sélectionner la promotion
              </option>
              <option
                v-for="promotion in storeApi.promotions"
                :key="getId(promotion.url)"
                :value="getId(promotion.url)"
              >
                {{
                  `${promotion.starting_year}-${promotion.ending_year} — ${promotion.name}`
                }}
              </option>
            </select>
          </div>

          <h6 class="text-xs text-gray font-medium uppercase">select</h6>
        </label>
      </div>

      <ul class="hidden md:block min-w-min overflow-y-scroll divide-y">
        <li
          v-for="promotion in storeApi.promotions"
          :key="getId(promotion.url)"
        >
          <!-- {{ promotion }}         -->
          <router-link
            :to="`/school/promotion/${getId(promotion.url)}`"
            class="promo__link p-2 flex flex-col m-3 items-start justify-start gap-1 whitespace-nowrap"
            :class="{
              'bg-gray-extralightest dark:bg-black-light':
                $route.path.match(/.(school).(promotion)/gm) &&
                Number($route.params.id) === getId(promotion.url),
            }"
            @click="promoId = getId(promotion.url)"
          >
            <UnderlineTitle
              :title="`${promotion.starting_year}-${promotion.ending_year}`"
              :uppercase="false"
              :underlineSize="1"
              :fontSize="5"
            ></UnderlineTitle>
            <p class="pl-5">{{ promotion.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Key reload everytime a changement occur -->
    <!-- <router-view v-if="promoId" :promoId="promoId" /> -->
    <PromotionStudents />
    <!-- {{ storeApi.promotion.students }} -->
  </main>
</template>

<style scoped></style>
