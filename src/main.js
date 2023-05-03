import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

import { createI18n } from "vue-i18n";

import config from "@/config";
import "./css/styles.css";
import "@/composables/interceptors";

const app = createApp(App);

axios.defaults.baseURL = `${config.rest_uri_v2}`;

// import translations
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

/**
 * Get dynamic locale from navigator.languages if possible and return it
 * @returns {string} locale - the locale language to use
 */
function defineLocale() {
  // navigator.languages can scrap the language from the navigator user
  const navigatorLanguages = navigator.languages;
  if (navigatorLanguages) {
    const acceptedLanguages = ["fr", "en"];

    const firstLanguage = navigatorLanguages[0].split("-")[0];

    if (acceptedLanguages.includes(firstLanguage)) {
      return firstLanguage;
    }

    return "fr";
  }
  return "fr";
}

// configure i18n
const i18n = createI18n({
  locale: defineLocale(),
  // more data will come in fr
  fallbackLocale: "fr",
  messages: { fr, en },
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
