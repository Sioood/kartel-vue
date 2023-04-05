import { createApp } from "vue";
import { createPinia } from "pinia";


import App from "./App.vue";
import router from "./router";

import "./css/styles.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);


// app.component(
//   Markdown
// )

app.mount("#app");
