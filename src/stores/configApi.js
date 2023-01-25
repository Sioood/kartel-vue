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

  // config api
  const restUriV2 = "https://api.lefresnoy.net/v2/";

  // states / refs
  let promotions = ref([]);
  let promoStudents = ref([]);

  // Get promotions list and return to ref "promotions"
  async function getPromotions() {
    let response = await fetch(`${restUriV2}school/promotion`);
    let data = await response.json();

    //sort in order to have latest promotion first
    //Sort by descending promotions
    const descendingStartingYear = data.sort(
      (a, b) => b.starting_year - a.starting_year
    );

    promotions.value = descendingStartingYear;
  }

  // Getters promo id with url of promo gived by promotion api
  function promoId(url) {
    const split = url.split("/");
    const id = split[split.length - 1];
    // console.log(id);
    return `/school/promotion/${id}`;
  }

  async function getPromoStudents(promoId) {
    let response = await fetch(
      `${restUriV2}school/student?artist=&user=&promotion=${promoId}`
    );
    let data = await response.json();

    //DO sort students by order
    promoStudents.value = data;
  }

  return {
    restUriV2,
    promotions,
    getPromotions,
    promoId,
    getPromoStudents,
    promoStudents,
  };
});
