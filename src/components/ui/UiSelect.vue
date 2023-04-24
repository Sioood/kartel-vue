<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["options", "selectedValue", "desc", "defaultValue"]);

let value = ref();

onMounted(() => {
  value.value = props.selectedValue;
});
</script>

<template>
  <div class="">
    <label
      for="date"
      class="flex flex-col items-end after:block after:w-full after:h-1 after:bg-black"
    >
      <div class="w-full flex items-end">
        <svg
          class="h-fit fill-gray-dark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 16l-6-6h12z" />
        </svg>
        <select
          name="date"
          id="date"
          class="px-2 w-24 truncate after:block after:w-10 after:h-1 after:bg-black cursor-pointer"
          :title="value || props.defaultValue"
          v-model="value"
          @change="$emit('update:option', value) && log($event)"
        >
          <option :value="null">{{ props.defaultValue }}</option>
          <option :value="null" disabled>—————</option>
          <option :value="option" v-for="option in props.options" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
    </label>
    <h6 class="pl-4 text-xs text-right text-gray">{{ props.desc }}</h6>
  </div>
</template>

<style scoped></style>
