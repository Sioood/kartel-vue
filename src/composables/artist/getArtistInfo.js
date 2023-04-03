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
 * @type {object} - artist
 * @type {array} - artwork
 * @type {object} - student
 * @type {object} - user
 */
  let artist = ref();
  let artwork = ref();
  let student = ref();
  let user = ref();


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
      let response = await fetch(`${config.rest_uri_v2}people/user/${id}`);
      let data = await response.json();

      user.value = data;
    } catch (err) {
      console.log(err);
      user.value = {};
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
  async function getUserProfile() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${config.rest_uri_v2}people/userprofile/1${user.value.profile.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      let data = await response.json();

      user.value.profile = data;
    } catch (err) {
      console.error(err);
    }
  }

  onBeforeMount(async () => {
    // await the artist data for get the user url to not exec the function getUser inside
    await getArtist(artistId);

    await getUser(getId(artist.value.user));

    getArtworks(artistId);

    getStudent(artistId);

    if (!auth) {
      getUserProfile();
    }
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

    // export functions for test
    getArtist,
    getUser,
    getArtworks,
    getStudent,
  };
};
