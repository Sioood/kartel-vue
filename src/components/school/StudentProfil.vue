<script setup>
import { useConfigApi } from "../../stores/configApi";

const storeApi = useConfigApi();
</script>

<template>
  <div>Student Profile</div>
  <p>{{ storeApi.test }}</p>
</template>

<style scoped></style>
