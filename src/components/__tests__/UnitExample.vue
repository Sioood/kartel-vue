<script setup>
import { sum, value } from "./UnitExample.js";

let variable = "i'm a variable";

function test() {
  return "test";
}

// defineExpose allows methods and variable to be accessed out of the component. <script setup> is by default closed
defineExpose({ test, variable });
</script>

<template>
  <div>
    <h2>sum(): {{ sum(1, 1) }}</h2>
    <h2>value: {{ value }}</h2>
    <h2>variable: {{ variable }}</h2>
  </div>
</template>

<style scoped></style>
