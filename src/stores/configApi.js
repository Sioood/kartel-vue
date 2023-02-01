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
  // Au lieu de stocker les étudiants dans promos faire un autre tableau avec tout les étudiants et leur passer l'id promo
  // Avec un .filter on peut récupérer plus facilement tout les étudiants
  // -> pour d'autre utilisation ça évite de venir de trop loin dans l'arborescence
  let promotions = ref([]);
  let selectedPromo = ref();
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

  async function getSelectedPromo(promoId) {
    let response = await fetch(`${restUriV2}school/promotion/${promoId}`);
    let data = await response.json();
    selectedPromo.value = data;
  }

  // Si Click trop rapide entre les promos et donc pas le temps de finir les requêtes
  // on obtient un mélange des promo
  async function getPromoStudents(promoId) {
    let response = await fetch(
      `${restUriV2}school/student?artist=&user=&promotion=${promoId}&ordering=user__last_name`
    );
    let data = await response.json();

    promoStudents.value = [];

    data.map((student) => {
      getUser(student);
    });

    sortStudents();
  }

  function sortStudents(order) {
    // for Promotion Marguerite Duras sort invert V and Y for Yoo and Villafagne ?!
    if (order === "descending") {
      const sort = promoStudents.value.sort((a, b) => {
        // Sort with lower or upper case for avoid bad sorting because not the same Unicode
        console.log(a.userData.last_name.toLowerCase());
        return a.userData.last_name < b.userData.last_name ? 1 : -1;
      });

      promoStudents.value = sort;
    } else {
      const sort = promoStudents.value.sort((a, b) =>
        a.userData.last_name > b.userData.last_name ? 1 : -1
      );

      promoStudents.value = sort;
    }
  }

  // Need to do the same with artist
  async function getUser(student) {
    // fetch(student.user)
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     // response.json();

    //     // student.userData = response.json();
    //   })
    //   .then((data) => {
    //     student.userData = data;
    //     student.userData = "test";
    //     promoStudents.value = test;

    //     return data;
    //   });

    const response = await fetch(student.user);
    const userData = await response.json();
    student.userData = userData;

    promoStudents.value.push(student);
    // student.userData = data;
    // return data;
  }

  function getId(url) {
    const split = url.split("/");
    const id = split[split.length - 1];
    return Number(id);
  }

  return {
    restUriV2,
    promotions,
    selectedPromo,
    getPromotions,
    getSelectedPromo,
    getPromoStudents,
    sortStudents,
    promoStudents,
    getUser,
    getId,
  };
});
