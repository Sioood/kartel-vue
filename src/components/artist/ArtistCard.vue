<script setup>
import { computed } from "vue";

import { getId } from "@/composables/getId";

const props = defineProps({
  artist: Object,
});

const fullname = computed(() => {
  return `${props.artist.userData.first_name} ${props.artist.userData.last_name}`;
});
</script>

<template>
  <div
    v-if="props.artist"
    class="relative h-full border-solid border-2 border-gray hover:border-black dark:hover:border-gray-extralightest"
    :key="props.artist"
  >
    <!-- parameters Query with id Student ? User ? Artist ? all ? -->
    <router-link
      :to="`/artist/${props.artist.id}`"
      class="h-full flex flex-col justify-between"
    >
      <div class="w-full h-44">
        <img
          v-if="props.artist?.userData?.profile?.photo"
          class="w-full h-44 object-cover"
          :src="props.artist.userData.profile.photo"
          :alt="`Photo de ${fullname}`"
        />
        <!-- Lorem photo ? -->
      </div>
      <div v-if="props.artist?.nickname" class="p-2 w-full capitalize">
        <p class="last:font-bold">
          {{ props.artist?.nickname }}
        </p>
      </div>

      <div v-else class="p-2 w-full capitalize">
        <p v-if="props.artist?.userData?.first_name" class="last:font-bold">
          {{ props.artist.userData.first_name }}
        </p>
        <p v-if="props.artist?.userData?.last_name" class="last:font-bold">
          {{ props.artist.userData.last_name }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style scoped></style>
