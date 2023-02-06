<script setup>
import { useConfigApi } from "../stores/configApi";
import { onMounted, ref } from "vue";

import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";

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
      <UnderlineTitle
        class="p-2 [&:nth-child(1)>:nth-child(1)]:w-full"
        title="Promotions"
        subtitle="Sélectionner"
        :uppercase="false"
        :half="false"
        :underlineSize="1"
        :fontSize="3"
      ></UnderlineTitle>

      <ul class="min-w-min overflow-y-scroll divide-y">
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
              :half="false"
              :underlineSize="1"
              :fontSize="5"
            ></UnderlineTitle>
            <p class="pl-5">{{ promotion.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view :promoId="promoId" />
  </main>
</template>

<style scoped></style>
