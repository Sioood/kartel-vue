// import all the dependencies of the app, pinia, router... for the test
// There might be a better way
// import "@/main";

import config from "@/config";

import { ref, onBeforeMount } from "vue";

import { getId } from "@/composables/getId";

/**
 *  const which store and execute all the functions to fetch artist data
 *
 * @param {string} artistId (number id) - the id of the artist by the params url
 * @param {string} auth - the token of the user
 *
 */
export const getArtistInfo = (artistId, auth) => {
  /**
   * @type {object} artist
   * @type {array} artwork
   * @type {object} student
   * @type {object} user
   * @type {object} candidature
   */
  let artist = ref();
  let artwork = ref();
  let student = ref();
  let user = ref();
  let candidature = ref();

  /**
   *  set token and get user information with the id url of artist.user
   *  If the token is empty it's means that the user is not authenticated and set empty string.
   *
   * @type {string} token
   */
  let token = localStorage.getItem("token") || "";

  /**
   *  function for fetching artist data
   *
   * @param {string} id (number id) - the id of the artist
   *
   */
  async function getArtist(id) {
    try {
      let response = await fetch(`${config.rest_uri_v2}people/artist/${id}`);
      let data = await response.json();

      artist.value = data;
    } catch (err) {
      console.log(err);
      artist.value = {};
    }

    // get user information with the id url of artist.user
    // getUser(getId(data.user));
  }

  /**
   *  function for fetching user data of artist
   *
   * @param {string} id (number id) - the id of the artist
   *
   */
  async function getUser(id) {
    try {
      let response = await fetch(`${config.rest_uri_v2}people/user/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          // set the token everytime, if the user is not authenticated it's empty and the api send only "not authenticated" informations
          Authorization: `JWT ${token}`,
        },
      });
      let data = await response.json();

      user.value = data;
    } catch (err) {
      console.log(err);
      user.value = {};
    }
  }

  /**
   *  Fetch candidature from username
   *
   * @param {string} username - the username of the artist
   */

  async function getCandidature(username) {
    try {
      let response = await fetch(
        `${config.rest_uri_v2}school/student-application?search=${username}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            // set the token everytime, if the user is not authenticated it's empty and the api send only "not authenticated" informations
            Authorization: `JWT ${token}`,
          },
        }
      );
      let data = await response.json();

      if (data.length > 0) {
        console.log(data);
        // get the candidature in data which have selected true
        candidature.value = data.filter((item) => item.selected)[0];
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *  Fetch artwork data form the artist
   *
   * @param {string} id (number id) - the id of the artist
   *
   */
  async function getArtworks(id) {
    try {
      let response = await fetch(
        `${config.rest_uri_v2}production/artwork?authors=${id}`
      );
      let data = await response.json();

      artwork.value = data;
    } catch (err) {
      console.log(err);
      artwork.value = {};
    }
  }

  /**
   *  Fetch student data of the artist
   *
   * @param {string} id (number id) - the id of the artist
   *
   */
  async function getStudent(id) {
    try {
      let response = await fetch(
        `${config.rest_uri_v2}school/student?artist=${id}`
      );
      let studentData = await response.json();

      try {
        let response = await fetch(studentData[0].promotion);
        let promotionData = await response.json();

        studentData.promotion = promotionData;

        student.value = studentData;
      } catch (err) {
        student.value = {};
      }

      // student.value = data;
    } catch (err) {
      student.value = {};
    }
  }

  // AUTHENTIFIED DATA

  /**
   *  Fetch artist data with the user.profile.id
   */
  // async function getUserProfile() {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await fetch(
  //       `${config.rest_uri_v2}people/userprofile/${user.value.profile.id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `JWT ${token}`,
  //         },
  //       }
  //     );
  //     let data = await response.json();

  //     user.value.profile = data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  onBeforeMount(async () => {
    // await the artist data for get the user url to not exec the function getUser inside
    await getArtist(artistId);

    await getUser(getId(artist.value.user));

    // auth is checked by invert because if checked by a !local.storage which invert boolean response
    if (!auth) {
      getCandidature(user.value.username);
    }

    getArtworks(artistId);

    getStudent(artistId);
  });

  /**
   *  @exports data for access outside
   */
  return {
    // define access to the ref needed inside the template
    artist,
    user,
    artwork,
    student,
    candidature,

    // export functions for test
    getArtist,
    getUser,
    getArtworks,
    getStudent,
  };
};
