<script setup>
import config from "@/config";

import { computed } from "vue";

import userPlaceholder from "@/assets/placeholder_user.svg";

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
          class="w-full h-44 bg-gray-extralightest"
          :class="{
            'object-cover': props.artist?.userData?.profile?.photo,
            'p-2': !props.artist?.userData?.profile?.photo,
          }"
          :src="
            props.artist?.userData?.profile?.photo
              ? `${config.media_service}?url=${props.artist.userData.profile.photo}&mode=adapt&w=300&fmt=jpg`
              : userPlaceholder
          "
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
