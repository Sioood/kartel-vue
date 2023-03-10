<script setup>
import { sum, value } from "./UnitExample.js";

defineProps(["title"]);

let variable = "i'm a variable";

let testable = ref({
  property: "test"
})

function test() {
  return "exposed test";
}

function returnString(string) {
  return string;
}

// defineExpose allows methods and variable to be accessed out of the component. <script setup> is by default closed
defineExpose({ test, variable, returnString });
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-medium underline">{{ title }}</h1>
    <h2>sum(): {{ sum(1, 1) }}</h2>
    <h2>value: {{ value }}</h2>
    <h2>variable: {{ variable }}</h2>
    <h2>test: {{ test() }}</h2>
    <h2>{{ testable.property }}</h2>
  </div>
</template>

<style scoped></style>
