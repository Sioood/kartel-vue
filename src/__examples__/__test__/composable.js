import { ref } from 'vue';

export const composable = (items) => {
  const letters = ref(["a", "b", "c"]);
  const numbers = ref(items);

// console.log({
//   letters,
//   numbers,
// });

  return {
    letters,
    numbers,
  };

};