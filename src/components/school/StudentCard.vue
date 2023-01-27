<script setup>
import { defineProps } from "vue";

const props = defineProps({
  student: Object,
});
</script>

<template>
  <div>
    <!-- <p>{{ props.student }}</p> -->
    <li
      v-if="props.student.userData"
      class="relative border-solid border-2 border-gray-500 rounded-md hover:border-black"
      key="studentUser.id"
    >
      <router-link :to="`/school/student/${props.student.userData.id}`">
        <div class="p-2 w-full h-full">
          <p>{{ props.student.userData.first_name }}</p>
          <!-- <p>{{ studentUser.first_name }}</p> -->
          <p class="capitalize">
            <b>{{ props.student.userData.last_name }}</b>
            <!-- <b>{{ studentUser.last_name }}</b> -->
          </p>
        </div>
      </router-link>
    </li>
  </div>
</template>

<style scoped></style>
