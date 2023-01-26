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

  // Transformer en promoStudents en promo actuel
  // let promo = ref({
  //   promo: "",
  //   students: "",
  // });

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

    // Fetch User and Artist api -> problem with getting info after display

    // data.map((student) => {
    //   // Test for info of time, in end we get "data" and not the result of getUser()
    //   // Now we get an [Object Promise] -> with slow 3g we can see the result appear and dissapear to transfom to an [Object Promise]
    //   student.userData = "data";

    //   student.userData = getUser(student);
    //   // console.log(student);
    // });

    // console.log(data.user);

    //sort in order to have latest promotion first
    //Sort by descending promotions
    // const ascendingName = data.sort((a, b) => {
    //   // console.log(a.userData, b);
    // });
    // console.log(ascendingName);

    // data.map give undefined ???

    //DO sort students by order
    promoStudents.value = data;
  }

  // getUserData with is link from promotion students -> need to do the same with artist
  async function getUser(student) {
    let response = await fetch(student.user);
    let data = await response.json();

    student.userData = data;
    return data;
  }

  return {
    restUriV2,
    promotions,
    getPromotions,
    promoId,
    getPromoStudents,
    promoStudents,
    getUser,
  };
});
