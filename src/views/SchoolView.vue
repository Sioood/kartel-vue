<script setup>
// import { useBaseUrl } from "@/stores/baseUrl";
import { useConfigApi } from "../stores/configApi";
import { onMounted } from "vue";

const storeApi = useConfigApi();

// let apiV2 = ref(storeApi.restUriV2);

onMounted(() => {
  storeApi.getPromotions();
});
</script>

<template>
  <main class="pt10">
    <ul
      class="pt-10 max-w-min max-h-screen overflow-y-scroll flex flex-col gap-3"
    >
      <li v-for="promotion in storeApi.promotions" :key="promotion">
        <!-- {{ promotion }}         -->
        <router-link
          :to="storeApi.promoId(promotion.url)"
          class="flex flex-col m-3 items-start justify-start gap-1 whitespace-nowrap"
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
  </main>
</template>

<style scoped></style>
