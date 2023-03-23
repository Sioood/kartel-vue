import { defineStore } from "pinia";
import { ref } from "vue";

import config from "../config";

export const useConfigApi = defineStore("configApi", () => {
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
    let response = await fetch(`${config.rest_uri_v2}school/promotion`);
    let data = await response.json();

    //sort in order to have latest promotion first
    //Sort by descending promotions
    const descendingStartingYear = data.sort(
      (a, b) => b.starting_year - a.starting_year
    );

    promotions.value = descendingStartingYear;
  }

  async function getSelectedPromo(promoId) {
    let response = await fetch(
      `${config.rest_uri_v2}school/promotion/${promoId}`
    );
    let data = await response.json();
    selectedPromo.value = data;
  }

  // Si Click trop rapide entre les promos et donc pas le temps de finir les requêtes
  // on obtient un mélange des promo
  async function getPromoStudents(promoId) {
    let response = await fetch(
      `${config.rest_uri_v2}school/student?&promotion=${promoId}&ordering=user__last_name`
    );
    let data = await response.json();

    promoStudents.value = [];

    const users = data.map(async (student) => {
      // await getUser(student);
      // console.log(await getUser(student));

      student.userData = await getUser(student);

      // run each time a request finish -> not good for performance but avoid the card to jump if we sort after all
      // sortStudents();

      // console.log(student);
      return student;
    });

    await Promise.all(users);

    // set promoStudents with studentWithUser after sorted
    promoStudents.value = sortStudents(await Promise.all(users));
  }

  function sortStudents(students, order) {
    // for Promotion Marguerite Duras sort invert V and Y for Yoo and Villafagne ?!
    if (order === "descending") {
      const sort = students.sort((a, b) => {
        // Sort with lower or upper case for avoid bad sorting because not the same Unicode
        console.log(a.userData.last_name.toLowerCase());
        return a.userData.last_name < b.userData.last_name ? 1 : -1;
      });

      return students = sort;
    } else {
      const sort = students.sort((a, b) =>
        a.userData.last_name > b.userData.last_name ? 1 : -1
      );

      return students = sort;
    }
  }

  // Need to do the same with artist
  async function getUser(student) {
    const response = await fetch(student.user);
    const userData = await response.json();
    // student.userData = userData;

    // console.log(userData);
    // console.log(student);

    // promoStudents.value.push(student);

    // console.log(await userData);
    return await userData;
    // student.userData = data;
    // return data;
  }

  return {
    promotions,
    selectedPromo,
    getPromotions,
    getSelectedPromo,
    getPromoStudents,
    sortStudents,
    promoStudents,
    getUser,
  };
});
