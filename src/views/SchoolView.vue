<script setup>
// import { useBaseUrl } from "@/stores/baseUrl";
import { useConfigApi } from "../stores/configApi";
import { onMounted } from "vue";

const storeApi = useConfigApi();

// let apiV2 = ref(storeApi.restUriV2);

onMounted(() => {
  storeApi.getPromotions();
  console.log(1);
  console.log(storeApi.promotions);
});
</script>

<template>
  <main>
    <h1>School</h1>
    <ul class="promotion__list max-w-min">
      <li v-for="promotion in storeApi.promotions" :key="promotion">
        <!-- {{ promotion }}         -->
        <router-link
          :to="storeApi.promoId(promotion.url)"
          class="flex flex-row m-3 items-center justify-left gap-3 whitespace-nowrap"
        >
          <!-- <p>{{ promotion.url }}</p> -->
          <p class="p-2 bg-teal-400 text-teal-50 rounded whitespace-nowrap">
            {{ `${promotion.starting_year}-${promotion.ending_year}` }}
          </p>
          <p>{{ promotion.name }}</p>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
