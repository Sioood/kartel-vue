<script setup>
import { useRouter } from "vue-router";

import { useConfigApi } from "../stores/configApi";
import { onMounted, ref } from "vue";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";

const router = useRouter();

const storeApi = useConfigApi();

let promoId = ref();
let promoSelected = ref(promoId);

function selectPromotion(id) {
  router.push(`/school/promotion/${id}`);
  // router.replace(`/school/promotion/${storeApi.getId(url)}`);
}

onMounted(() => {
  const routerPromoId = router.currentRoute.value.params.id;

  promoId.value = routerPromoId;

  if (!storeApi.promotions[0]) {
    storeApi.getPromotions();
  }
});
</script>

<!-- Rename to be Student / Artist view -> Promo list only for student or hidden with button for artist -->
<template>
  <main
    class="h-screen md:pr-20 pb-10 w-full flex flex-col md:flex-row md:divide-x divide-y"
  >
    <div class="sticky top-0 py-2 px-2 flex flex-col justify-between gap-4">
      <div class="p-2 flex flex-col gap-3">
        <UnderlineTitle
          class="[&:nth-child(1)>:nth-child(1)]:w-full"
          title="Promotions"
          subtitle="Sélectionner"
          :uppercase="false"
          :underlineSize="1"
          :fontSize="3"
        ></UnderlineTitle>

        <label for="" class="w-max flex flex-col items-end">
          <div class="after:block after:w-full after:h-1 after:bg-black">
            <select
              v-model="promoSelected"
              @change="selectPromotion(promoSelected)"
              class="px-2 cursor-pointer"
              :class="{ 'text-gray': isNaN(promoSelected) }"
            >
              <option disabled :value="undefined">
                Sélectionner la promotion
              </option>
              <option
                v-for="promotion in storeApi.promotions"
                :key="storeApi.getId(promotion.url)"
                :value="storeApi.getId(promotion.url)"
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
          :key="storeApi.getId(promotion.url)"
        >
          <!-- {{ promotion }}         -->
          <router-link
            :to="`/school/promotion/${storeApi.getId(promotion.url)}`"
            class="promo__link p-2 flex flex-col m-3 items-start justify-start gap-1 whitespace-nowrap"
            :class="{
              'bg-gray-extralightest dark:bg-black-light':
                $route.path.match(/.(school).(promotion)/gm) &&
                Number($route.params.id) === storeApi.getId(promotion.url),
            }"
            @click="
              (promoId = storeApi.getId(promotion.url)),
                storeApi.getPromoStudents(promoId),
                storeApi.getSelectedPromo(promoId)
            "
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
    <router-view :promoId="promoId" :key="promoId" />
  </main>
</template>

<style scoped></style>
