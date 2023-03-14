<script setup>
import { useConfigApi } from "../../stores/configApi";

const storeApi = useConfigApi();

const props = defineProps({
  student: Object,
});
</script>

<template>
  <li class="bg-white">
    <div
      v-if="props.student.userData"
      class="relative h-full border-solid border-2 border-gray hover:border-black dark:hover:border-gray-extralightest"
      :key="props.student.userData.id"
    >
      <!-- parameters Query with id Student ? User ? Artist ? all ? -->
      <router-link :to="`/artist/${storeApi.getId(props.student.artist)}`">
        <div class="p-2 w-full h-full capitalize">
          <p v-if="props.student.userData.first_name" class="last:font-bold">
            {{ props.student.userData.first_name }}
          </p>
          <p v-if="props.student.userData.last_name" class="last:font-bold">
            {{ props.student.userData.last_name }}
          </p>
        </div>
      </router-link>
    </div>
  </li>
</template>

<style scoped></style>
