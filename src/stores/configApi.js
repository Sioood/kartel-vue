import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigApi = defineStore("configApi", () => {
  // config = {
  //     templateBaseUrl: '/views/',
  //     useHtml5Mode: false,
  //     api_url: "https://api.lefresnoy.net/",
  //     rest_uri_v2: "https://api.lefresnoy.net/v2/",
  //     rest_uri: "https://api.lefresnoy.net/v1/",
  //     media_service: "https://media.lefresnoy.net/",
  //     reset_password_uri: "https://api.lefresnoy.net/account/reset_password/",
  //     ame_rest_uri: "https://ame.lefresnoy.net/plugins/api_search/"
  // };

  const restUriV2 = "https://api.lefresnoy.net/v2/";

  // states
  let promotions = ref([]);

  // Get promotions list and return to ref "promotions"
  async function getPromotions() {
    let response = await fetch(`${restUriV2}school/promotion`);
    let data = await response.json();
    promotions.value = data;
  }

  // Getters promo id with url of promo gived by promotion api
  function promoId(url) {
    const split = url.split("/");
    const id = split[split.length - 1];
    return `/school/promotion/${id}`;
  }

  return { restUriV2, promotions, getPromotions, promoId };
});
