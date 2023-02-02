<script setup>
import { useConfigApi } from "../stores/configApi";
import { onMounted, ref } from "vue";

const storeApi = useConfigApi();

let promoId = ref();

onMounted(() => {
  if (!storeApi.promotions[0]) {
    storeApi.getPromotions();
  }
});
</script>

<!-- Rename to be Student / Artist view -> Promo list only for student or hidden with button for artist -->
<template>
  <main class="h-screen pt-12 pr-20 pb-10 w-full flex gap-10">
    <div
      class="sticky top-0 py-2 px-2 flex flex-col justify-between gap-4 shadow-border"
    >
      <div class="p-2 w-max flex flex-col items-end">
        <h1
          class="capitalize relative py-2 text-xl font-bold after:w-full after:h-1 after:bg-black after:dark:bg-white"
        >
          Promotions
        </h1>
        <div class="w-full h-1 bg-black dark:bg-white"></div>
        <h6 class="text-xs text-gray">Sélectionner</h6>
      </div>
      <ul class="min-w-min overflow-y-scroll">
        <li v-for="promotion in storeApi.promotions" :key="promotion">
          <!-- {{ promotion }}         -->
          <router-link
            :to="`/school/promotion/${storeApi.getId(promotion.url)}`"
            class="promo__link p-2 flex flex-col m-3 items-start justify-start gap-1 whitespace-nowrap"
            :class="{
              'bg-gray-extralightest dark:bg-black':
                $route.path.match(/.(school).(promotion)/gm) &&
                Number($route.params.id) === storeApi.getId(promotion.url),
            }"
            @click="
              (promoId = storeApi.getId(promotion.url)),
                storeApi.getPromoStudents(promoId),
                storeApi.getSelectedPromo(promoId)
            "
          >
            <!-- <p>{{ promotion.url }}</p> -->
            <p
              class="relative whitespace-nowrap after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-1 after:bg-black"
            >
              {{ `${promotion.starting_year}-${promotion.ending_year}` }}
            </p>
            <p class="pl-5">{{ promotion.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view :promoId="promoId" />
  </main>
</template>

<style scoped></style>
