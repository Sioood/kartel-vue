<script setup>
// import { useBaseUrl } from "@/stores/baseUrl";
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

<template>
  <main class="pt10 flex">
    <ul
      class="fixed py-10 px-2 min-w-min max-w-min max-h-screen overflow-y-scroll flex flex-col"
    >
      <li v-for="promotion in storeApi.promotions" :key="promotion">
        <!-- {{ promotion }}         -->
        <router-link
          :to="`/school/promotion/${storeApi.getId(promotion.url)}`"
          class="p-2 flex flex-col m-3 items-start justify-start gap-1 whitespace-nowrap border-solid border-8"
          :class="{
            'border-white': $route.path.match(/.(school)/gm),
            'border-black':
              $route.path.match(/.(school).(promotion)/gm) &&
              Number($route.params.id) === storeApi.getId(promotion.url),
          }"
          @click="
            (promoId = storeApi.getId(promotion.url)),
              storeApi.getPromoStudents(promoId)
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
    <router-view :promoId="promoId" class="pl-72 p-6" />
  </main>
</template>

<style scoped></style>
