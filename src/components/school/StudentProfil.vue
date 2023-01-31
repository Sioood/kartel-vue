<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useConfigApi } from "../../stores/configApi";

const router = useRouter();
const storeApi = useConfigApi();

let student = ref();

onMounted(() => {
  // the user came from promo -> students of the promo are stored in store
  // get the student with filter the store promo students
  if (storeApi.promoStudents) {
    student.value = storeApi.promoStudents.filter((student) => {
      return storeApi.getId(student.user) ===
        Number(router.currentRoute.value.parameters.id)
        ? true
        : false;
    });
  } else {
    // fetch artist with router id
  }
});
</script>

<template>
  <p>Student Profile</p>
  <p>{{ student }}</p>
  <!-- <p>{{ storeApi.promoStudents }}</p> -->
</template>

<style scoped></style>
