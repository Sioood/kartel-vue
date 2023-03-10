<script setup>
import { composable } from "./composable.js";

console.log(composable());

// reactive
const { letters: letters, numbers: numbers } = composable([1,2,3]);

// update on next update not working good
const items = composable([1,2,3]);
</script>

<template>
  <div class="p-10">
    <h2>Letters: {{ letters }}</h2>
    <ul>
      <TransitionGroup name="list">
        <li v-for="letter in letters" :key="letter">- {{ letter }}</li>
      </TransitionGroup>
    </ul>
    <h2>Numbers: {{ numbers }}</h2>
    <ul>
      <li v-for="number in numbers" :key="number">- {{ number }}</li>
    </ul>

    <div>{{ items }}</div>

    <button class="p-2 border" @click="letters = ['d', 'e', 'f']">
      swap letters
    </button>

    <button class="p-2 border" @click="items.numbers = [4, 5, 6]">
      swap numbers
    </button>
  </div>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
