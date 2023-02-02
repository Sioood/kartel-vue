<script setup>
import { useRouter } from "vue-router";

import { onMounted } from "vue";
import { useConfigApi } from "../../stores/configApi";

import StudentCard from "./StudentCard.vue";

const router = useRouter();
const storeApi = useConfigApi();

const props = defineProps({
  promoId: Number,
});

onMounted(() => {
  // storeApi.getPromoStudents(props.promoId);

  if (!props.promoId) {
    storeApi.getPromoStudents(router.currentRoute.value.params.id);

    storeApi.getSelectedPromo(router.currentRoute.value.params.id);
  }
});
</script>

<template>
  <div class="py-12 px-10 w-full shadow-border overflow-scroll">
    <!-- <h2 class="p-3" v-if="storeApi.selectedPromo">
      <i>{{
        `This is a children of school view and is the promotion
        ${$route.params.id} ${storeApi.selectedPromo.name}`
      }}</i>
    </h2> -->

    <div class="mb-16 w-full flex items-center justify-between">
      <div class="w-max flex flex-col items-end">
        <h2
          class="promo__title relative p-3 text-2xl font-bold after:w-full after:h-1 after:bg-black after:dark:bg-white"
          v-if="storeApi.selectedPromo"
        >
          {{
            `${storeApi.selectedPromo.name} — ${storeApi.selectedPromo.starting_year}-${storeApi.selectedPromo.ending_year}`
          }}
        </h2>
        <div class="w-full h-1 bg-black dark:bg-white"></div>
        <h6 class="text-xs text-gray uppercase">Promotion</h6>
      </div>

      <div class="my-6 flex justify-end gap-3 text-sm">
        <button
          @click="storeApi.sortStudents()"
          class="p-2 bg-black text-white"
        >
          Sort Ascending
        </button>
        <button
          @click="storeApi.sortStudents('descending')"
          class="p-2 bg-black text-white"
        >
          Sort Descending
        </button>
      </div>
    </div>

    <ul v-if="storeApi.promoStudents[0]" class="grid grid-cols-5 gap-6">
      <!-- <p>{{ storeApi.promoStudents[0] }}</p> -->
      <!-- fetch all student before and not one by one inside the card -> get an array and can iterate it -->
      <!-- :key remplacer par l'index -> (object, index) -->
      <!-- Modèle de destructuration attendu -->
      <StudentCard
        class="artist__card"
        v-for="(student, index) in storeApi.promoStudents"
        :key="index"
        :student="student"
        :data-key="index"
      ></StudentCard>
      <!-- </li> -->
    </ul>
    <p v-else>Aucun étudiants n'est encore disponible pour cette promotion</p>
  </div>
</template>

<style scoped>
.promo__title {
  overflow: hidden;
  animation: appear 1s ease forwards;
  transition: background 0.3s ease;
}
@keyframes appear {
  from {
    transform: translate(0, 30%);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}

.artist__card {
  overflow: hidden;
  animation: appear 1s ease forwards;
  transition: background 0.3s ease;
}
@keyframes appear {
  from {
    transform: translate(0, 30%);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
