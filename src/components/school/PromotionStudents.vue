<script setup>
// import { useRouter } from "vue-router";

import { onMounted } from "vue";
import { useConfigApi } from "../../stores/configApi";

import StudentCard from "./StudentCard.vue";
import AppButton from "@/components/ui/AppButton.vue";
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";

// const router = useRouter();
const storeApi = useConfigApi();

const props = defineProps(["promoId"]);

onMounted(() => {
  // const routerPromoId = router.currentRoute.value.params.id;

  if (props.promoId) {
    console.log(true);
    storeApi.getPromoStudents(props.promoId);
    storeApi.getSelectedPromo(props.promoId);
  }
});

console.log(null);
</script>

<template>
  <div class="py-4 px-10 w-full flex flex-col gap-10 md:overflow-y-scroll">
    <!-- <h2 class="p-3" v-if="storeApi.selectedPromo">
      <i>{{
        `This is a children of school view and is the promotion
        ${$route.params.id} ${storeApi.selectedPromo.name}`
      }}</i>
    </h2> -->

    <div class="w-full flex flex-wrap items-center justify-between gap-3">
      <UnderlineTitle
        class="promo__title"
        v-if="storeApi.selectedPromo"
        :title="`${storeApi.selectedPromo.name} — ${storeApi.selectedPromo.starting_year}-${storeApi.selectedPromo.ending_year}`"
        subtitle="Promotion"
        :uppercase="true"
        :underlineSize="1"
        :fontSize="2"
      ></UnderlineTitle>

      <div class="my-6 flex justify-end gap-3 text-sm">
        <AppButton
          @click="storeApi.sortStudents(storeApi.promoStudents)"
          text="Sort Ascending"
        ></AppButton>
        <AppButton
          @click="storeApi.sortStudents(storeApi.promoStudents, 'descending')"
          text="Sort Descending"
        ></AppButton>
      </div>
    </div>

    <ul v-if="storeApi.promoStudents[0]" class="grid grid-cols-fluid gap-6">
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
