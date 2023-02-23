<script setup>
import { ref, onMounted } from "vue";

let theme = ref({
  color: "light",
  text: "🌖",
});

function toggleTheme() {
  theme.value.color === "light"
    ? (theme.value.color = "dark")
    : (theme.value.color = "light");

  theme.value.text === "🌖"
    ? (theme.value.text = "🌒")
    : (theme.value.text = "🌖");
}

onMounted(() => {
  if (document.documentElement.classList.contains("dark")) {
    toggleTheme();
  }
});
</script>

<template>
  <!-- <div
    v-if="theme"
    :class="{ light: theme.color === 'light', dark: theme.color !== 'light' }"
    class="relative p-4 w-full h-full flex flex-col items-center justify-center border-2 rounded"
  >
    <button @click="toggleTheme()" class="theme top-2 right-2">
      {{ theme.text }}
    </button>
    <slot></slot>
  </div> -->
  <div
    class="relative p-4 w-full h-full flex flex-col items-center justify-center border-2 rounded bg-gray-extralight text-black"
  >
    <button @click="toggleTheme()" class="theme top-2 right-2">
      {{ theme.text }}
    </button>
    <slot></slot>
  </div>
</template>

<style scoped>
@import "../src/css/styles.css";

.rounded {
  border-radius: 8px;
}

.theme {
  position: absolute;
  top: 4px;
  right: 4px;
}

html.dark .theme {
  visibility: hidden;
}

.light {
  background: rgb(216, 216, 216);
}
</style>
