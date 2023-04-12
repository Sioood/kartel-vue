// import all the dependencies of the app, pinia, router... for the test
// There might be a better way
// import "@/main";

import axios from "axios";

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
      const response = await axios.get(`people/artist/${id}`);

      const data = response.data;

      artist.value = data;
    } catch (err) {
      console.error(err);
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
    let headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };

    if (token) {
      console.log(true);
      headers.Authorization = `JWT ${token}`;
    }

    try {
      const response = await axios.get(`people/user/${id}`, {
        headers,
      });

      const data = response.data;

      user.value = data;

      // prevent if the user have a token but it's not a good token fetch without it
      // if (response.status === 401) {
      //   try {
      //     const response = await axios.get(`people/user/${id}`, {
      //       headers: {
      //         "Content-Type": "application/json;charset=UTF-8",
      //       },
      //     });

      //     const data = response.data;

      //     user.value = data;
      //   } catch (err) {
      //     console.error(err);
      //     user.value = {};
      //   }
      // } else {
      //   user.value = data;
      // }
    } catch (err) {
      console.error(err);
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
      const response = await axios.get(
        `school/student-application?search=${username}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            // set the token everytime, if the user is not authenticated it's empty and the api send only "not authenticated" informations
            Authorization: `JWT ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.length > 0) {
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
      const response = await axios.get(`production/artwork?authors=${id}`);

      const data = response.data;

      artwork.value = data;
    } catch (err) {
      console.error(err);
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
      const response = await axios.get(`school/student?artist=${id}`);

      const studentData = response.data;

      try {
        const response = await axios.get(studentData[0].promotion);

        let promotionData = response.data;

        studentData[0].promotion = promotionData;

        student.value = studentData;
      } catch (err) {
        student.value = {};
      }

      // student.value = data;
    } catch (err) {
      student.value = {};
    }
  }

  onBeforeMount(async () => {
    // await the artist data for get the user url to not exec the function getUser inside
    await getArtist(artistId);

    await getUser(getId(artist.value.user));

    getArtworks(artistId);

    getStudent(artistId);

    // auth is checked by invert because if checked by a !local.storage which invert boolean response
    if (!auth) {
      console.log(auth);
      getCandidature(user.value.username);
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
    candidature,

    // export functions for test
    getArtist,
    getUser,
    getArtworks,
    getStudent,
  };
};
