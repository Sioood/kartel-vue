import { ref } from "vue";

let value = ref();

function sum(a, b) {
  value.value = a + b;
  return a + b;
}

export { sum, value };
