<script setup>
import { useRouter } from "vue-router";

import { defineProps, onMounted } from "vue";
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
  }
});
</script>

<template>
  <div class="p-3 w-full">
    <h2 class="p-3">
      <i>{{
        "This is a children of school view and is the promotion " +
        $route.params.id
      }}</i>
    </h2>
    <!-- <p>{{ storeApi.promoStudents[0] }}</p> -->
    <button @click="storeApi.sortStudents('descending')" class="p-2">
      Sort Descending
    </button>
    <button @click="storeApi.sortStudents()" class="p-2">Sort Ascending</button>
    <ul v-if="storeApi.promoStudents[0]" class="grid grid-cols-5 gap-6">
      <!-- <p>{{ storeApi.promoStudents[0] }}</p> -->
      <!-- fetch all student before and not one by one inside the card -> get an array and can iterate it -->
      <StudentCard
        v-for="student in storeApi.promoStudents"
        :key="student"
        :student="student"
      ></StudentCard>
      <!-- </li> -->
    </ul>
    <p v-else>no students</p>
  </div>
  <!-- 
  <main class="w-screen h-screen bg-black">
  </main> -->
</template>

<style scoped></style>
