<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  // subtitle: String,
  // uppercase: Boolean,
  // half: Boolean,
  underlineSize: Number,
  // Size might be bad for differents size of h2 -> v-if and separate h1,h2,h3...
  fontSize: Number,
});
</script>

<template>
  <div class="w-max flex flex-col items-end">
    <h1
      v-if="fontSize === 1"
      class="text-3xl font-bold after:w-20 after:block after:bg-black after:dark:bg-white"
      :class="{
        'after:h-1': underlineSize !== 2,
        'after:h-2': underlineSize === 2,
      }"
    >
      {{ title }}
    </h1>
    <h2
      v-if="fontSize === 2"
      class="text-2xl font-bold after:w-20 after:block after:bg-black after:dark:bg-white"
      :class="{
        'after:h-1': underlineSize !== 2,
        'after:h-2': underlineSize === 2,
      }"
    >
      {{ title }}
    </h2>
    <h3
      v-else-if="fontSize === 3"
      class="text-xl font-bold after:w-20 after:block after:bg-black after:dark:bg-white"
      :class="{
        'after:h-1': underlineSize !== 2,
        'after:h-2': underlineSize === 2,
      }"
    >
      {{ title }}
    </h3>
    <h4
      v-else-if="fontSize === 4"
      class="text-lg font-bold after:w-20 after:block after:bg-black after:dark:bg-white"
      :class="{
        'after:h-1': underlineSize !== 2,
        'after:h-2': underlineSize === 2,
      }"
    >
      {{ title }}
    </h4>
    <h5
      v-else-if="fontSize === 5"
      class="text-base font-bold after:w-20 after:block after:bg-black after:dark:bg-white"
      :class="{
        'after:h-1': underlineSize !== 2,
        'after:h-2': underlineSize === 2,
      }"
    >
      {{ title }}
    </h5>
    <h6
      v-else-if="fontSize > 5 || !fontSize"
      class="text-sm font-bold after:w-20 after:block after:bg-black after:dark:bg-white"
      :class="{
        'after:h-1': underlineSize !== 2,
        'after:h-2': underlineSize === 2,
      }"
    >
      {{ title }}
    </h6>
    <!-- <h6 class="text-xs text-gray" :class="{ uppercase: uppercase === true }">
      {{ subtitle }}
    </h6> -->
  </div>
</template>

<style scoped></style>
