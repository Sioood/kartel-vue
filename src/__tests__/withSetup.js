import { createApp } from "vue";

import { createPinia } from "pinia";

/**

  withSetup is for a composable whick have vue lifecycle (beforeMounted, onMounted ...)

**/

// withSetup hook parameters is the composable we want it mount
// args is the function arguments we want to pass for the composables
// args is with rest operator because each composables can have differents number of arguments
export function withSetup(hook, ...args) {
  let results;

  const app = createApp({
    setup() {
      results = hook(...args);
      return () => {};
    },
  });

  const pinia = createPinia();
  app.use(pinia);

  app.mount(document.createElement("div"));

  return [results, app];
}
