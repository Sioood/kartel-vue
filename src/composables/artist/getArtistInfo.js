// import all the dependencies of the app, pinia, router... for the test
// There might be a better way
// import "@/main";

import axios from "axios";

import { ref } from "vue";

import { getId } from "@/composables/getId";

/**
 *  const which store and execute all the functions to fetch artist data
 *
 * @param {string} artistId (number id) - the id of the artist by the params url
 * @param {string} auth - the token of the user
 *
 */
// export const getArtistInfo = (artistId, auth) => {
/**
 * @type {object} artist
 * @type {array} artwork
 * @type {object} student
 * @type {object} user
 * @type {object} candidature
 */
let artist = ref();
let artworks = ref();
let websites = ref();
let student = ref();
let user = ref();
let candidature = ref();

/**
 *  set token and get user information with the id url of artist.user
 *  If the token is empty it's means that the user is not authenticated and set empty string.
 *
 * @type {string} token
 */
let token;

function initValues() {
  token = localStorage.getItem("token") || "";

  artist.value = {};
  artworks.value = [];
  websites.value = [];
  student.value = {};
  user.value = {};
  candidature.value = {};
}

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

  if (!!token) {
    headers.Authorization = `JWT ${token}`;
  }

  try {
    const response = await axios.get(`people/user/${id}`, {
      headers,
    });

    const data = response.data;

    user.value = data;
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

    candidature.value = {};
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

    artworks.value = data;
  } catch (err) {
    console.error(err);
    artworks.value = [];
  }
}

/**
 * Retrieves data from a list of artist websites.
 *
 * @param {Array} artistWebsites - List of artist websites to retrieve data from.
 * @return {Promise} Resolves with an array of website data.
 */
async function getWebsites(artistWebsites) {
  if (!artistWebsites) {
    return;
  }

  const websitesData = artistWebsites.map(async (website) => {
    try {
      const response = await axios.get(website);

      const data = response.data;

      return data;
    } catch (err) {
      console.error(err);
    }
  });

  websites.value = await Promise.all(websitesData);
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

    // return if no student data -> that means that the artist is not a student
    if (!studentData || studentData.length === 0) {
      student.value = [];
      return;
    }

    try {
      const response = await axios.get(studentData[0].promotion);

      let promotionData = response.data;

      studentData[0].promotion = promotionData;

      student.value = studentData[0];
    } catch (err) {
      console.error(err);
      student.value = {};
    }

    // student.value = data;
  } catch (err) {
    console.error(err);
    student.value = {};
  }
}

async function setup(artistId, auth) {
  initValues();

  // await the artist data for get the user url to not exec the function getUser inside
  await getArtist(artistId);

  await getUser(getId(artist.value.user));

  getArtworks(artistId);

  getWebsites(artist.value.websites);

  if (auth) {
    getCandidature(user.value.username);
  }

  await getStudent(artistId);
}

/**
 *  @exports data for access outside
 */
export {
  setup,
  // define access to the ref needed inside the template
  artist,
  user,
  artworks,
  websites,
  student,
  candidature,

  // export functions for test
  initValues,
  getArtist,
  getUser,
  getArtworks,
  getStudent,
  getCandidature,
};
// };
