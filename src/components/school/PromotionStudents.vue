<script setup>
import { useRouter } from "vue-router";

import { defineProps, onMounted, onUpdated } from "vue";
import { useConfigApi } from "../../stores/configApi";

import StudentCard from "./StudentCard.vue";

const router = useRouter();
const storeApi = useConfigApi();

const props = defineProps({
  promoId: Number,
});

onMounted(() => {
  if (!props.promoId) {
    storeApi.getPromoStudents(router.currentRoute.value.params.id);
  }
});

onUpdated(() => {
  // BOUCLE infinie !!!!!????? -> résolue avec la condition mais faire très attention

  if (
    storeApi.promoStudents.length !== 0 &&
    !storeApi.promoStudents[0].userData
  ) {
    // do the same with artist and userProfile for more informations
    storeApi.promoStudents.map((student) => {
      storeApi.getUser(student);
    });

    console.log(storeApi.promoStudents);

    storeApi.promoStudents.sort((a, b) => {
      console.log(a, b);
    });
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
    <ul v-if="storeApi.promoStudents[0]" class="grid grid-cols-5 gap-6">
      <!-- <li >\ -->
      <!-- {{ students }} -->
      <!-- <p>{{ storeApi.promoStudents[0] }}</p> -->
      <!-- fetch all student before and not one by one inside the card -> get an array and can iterate it -->
      <StudentCard
        v-for="student in storeApi.promoStudents"
        :key="student"
        :userProfil="student.user"
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
