<script setup>
import { useRouter } from "vue-router";

import { defineProps, onMounted } from "vue";
import { useConfigApi } from "../stores/configApi";

const router = useRouter();
const storeApi = useConfigApi();

const props = defineProps({
  promoId: Number,
  promoStudents: Array,
});

onMounted(() => {
  console.log(props.promoId);
  if (!props.promoId) {
    storeApi.getPromoStudents(router.currentRoute.value.params.id);
  }
});
</script>

<template>
  <main>
    <h2>
      {{
        "This is a children of school view and is the promotion " +
        $route.params.id
      }}
    </h2>
    <p class="w-full">{{ props.promoStudents }}</p>
  </main>
  <!-- 
  <main class="w-screen h-screen bg-black">
  </main> -->
</template>

<style scoped></style>
