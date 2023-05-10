<script setup>
import config from "@/config";

import { computed } from "vue";

import userPlaceholder from "@/assets/placeholder_user.svg";
import { getId } from "@/composables/getId";

const props = defineProps({
  student: Object,
});

const fullname = computed(() => {
  return `${props.student.userData.first_name} ${props.student.userData.last_name}`;
});
</script>

<template>
  <li class="bg-white">
    <div
      v-if="props.student.userData"
      class="relative h-full border-solid border-2 border-gray hover:border-black dark:hover:border-gray-extralightest"
      :key="props.student.userData.id"
    >
      <router-link :to="`/artist/${getId(props.student.artist)}`">
        <img
          class="w-full h-44 bg-gray-extralightest"
          :class="{
            'object-cover': props.student?.userData?.profile?.photo,
            'p-4': !props.student?.userData?.profile?.photo,
          }"
          :src="
            props.student.userData.profile.photo
              ? `${config.media_service}?url=${props.student.userData.profile.photo}&mode=adapt&w=300&fmt=jpg`
              : userPlaceholder
          "
          :alt="`Photo de ${fullname}`"
        />
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
