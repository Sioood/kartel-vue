<script setup>
import { useConfigApi } from "@/stores/configApi";

/**

  Component

**/
import StudentCard from "./StudentCard.vue";
import AppButton from "@/components/ui/AppButton.vue";
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";

const storeApi = useConfigApi();
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
        v-if="storeApi.promotion.data"
        :title="`${storeApi.promotion.data.name} — ${storeApi.promotion.data.starting_year}-${storeApi.promotion.data.ending_year}`"
        subtitle="Promotion"
        :uppercase="true"
        :underlineSize="1"
        :fontSize="2"
      ></UnderlineTitle>

      <div class="my-6 flex justify-end gap-3 text-sm">
        <AppButton @click="storeApi.sortStudents(storeApi.promotion.students)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              class="fill-white"
              d="M19 3l4 5h-3v12h-2V8h-3l4-5zm-5 15v2H3v-2h11zm0-7v2H3v-2h11zm-2-7v2H3V4h9z"
            />
          </svg>
        </AppButton>
        <AppButton
          @click="
            storeApi.sortStudents(storeApi.promotion.students, 'descending')
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path
              d="M20 4v12h3l-4 5-4-5h3V4h2zm-8 14v2H3v-2h9zm2-7v2H3v-2h11zm0-7v2H3V4h11z"
              fill="rgba(255,255,255,1)"
            />
          </svg>
        </AppButton>
      </div>
    </div>

    <ul
      v-if="storeApi.promotion.students?.length > 0"
      class="students grid grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] gap-3"
    >
      <!-- <p>{{ storeApi.promoStudents[0] }}</p> -->
      <!-- fetch all student before and not one by one inside the card -> get an array and can iterate it -->
      <!-- :key remplacer par l'index -> (object, index) -->
      <!-- Modèle de destructuration attendu -->
      <StudentCard
        class="student"
        v-for="(student, index) in storeApi.promotion.students"
        :key="student"
        :student="student"
        :data-key="index"
      ></StudentCard>
    </ul>
    <p v-else-if="storeApi.promotion.students && !storeApi.promotion.students[0] && !storeApi.promotion.load">
      Aucun étudiants n'a était trouvé pour cette promotion
    </p>
  </div>
</template>

<style scoped>
.promo__title {
  overflow: hidden;
  animation: appear 1s ease forwards;
  transition: background 0.3s ease;
}

.students {
  animation: appear 1s ease forwards;
}

.student {
  overflow: hidden;
  animation: appear 1s ease forwards;
  transition: all 0.3s ease;
}

@keyframes appear {
  from {
    transform: translate(0, 10%);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
