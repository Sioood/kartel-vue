import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

import config from "@/config";
import "./css/styles.css";
import "@/composables/interceptors";

const app = createApp(App);

axios.defaults.baseURL = `${config.rest_uri_v2}`;

app.use(createPinia());
app.use(router);

// app.component(
//   Markdown
// )

app.mount("#app");
