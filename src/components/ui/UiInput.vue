<script setup>
import { ref } from "vue";

/**
 * Props
 * @property {string} label - label of the input
 * @property {string} pattern - Regex pattern validation
 * @required @property {string} placeholder - placeholder of the input
 * @property {Boolean} required - if the input is required or not
 * @property {string} inputTitle - title of the input when required is triggered
 * @required @property {string} type - type of input
 */
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  pattern: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
  },
  inputTitle: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
});

/**
 * @type {string} input - ref model of the input
 */
let input = ref("");
</script>

<template>
  <label
    for="input"
    class="w-72 p-1 flex flex-col items-end text-xs text-gray-500"
    :data-value="input"
  >
    <input
      v-if="props.pattern"
      v-model="input"
      @input="$emit('update:value', $event.target.value)"
      :type="props.type"
      class="px-2 py-1 box-border w-full text-lg text-black placeholder-gray font-bold focus:bg-gray-100 transition-all duration-500"
      :placeholder="props.placeholder"
      :pattern="props.pattern"
      :required="props.required"
      :title="props.inputTitle"
      :data-value="input"
    />
    <span class="w-full h-1 bg-black dark:bg-white"></span>
    <h6 class="uppercase">{{ props.label }}</h6>

    <!-- <span class="error text-red-500" :data-err="props.inputTitle"></span>  -->
  </label>
</template>

<style scoped>
input[data-value=""] {
  border: transparent solid 1px !important;
}

input[data-value=""] ~ .error::after {
  content: "" !important;
}

input:valid {
  border: transparent solid 1px;
}

input:invalid {
  border: red solid 1px;
}

input:invalid ~ .error::after {
  content: attr(data-err);
  width: 100%;
  height: 100%;
}
</style>
