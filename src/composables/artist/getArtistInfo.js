// import all the dependencies of the app, pinia, router... for the test
// There might be a better way
// import "@/main";

import config from "@/config";

import { ref, onBeforeMount } from "vue";

import { getId } from "@/composables/getId";

export const getArtistInfo = (artistId) => {
  let artist = ref();
  let artwork = ref();
  let student = ref();
  let user = ref();

  // get artist based on the current route id
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

  // get user by artist id
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

  // get artwork bound to the current artist id
  async function getArtworks(id) {
    try {
      let response = await fetch(
        `${config.rest_uri_v2}production/artwork?authors=${id}`
      );
      let data = await response.json();

      artwork.value = data;
    } catch (err) {
      console.log(err);
      artwork.value = { data };
    }
  }

  // get student by artist id
  async function getStudent(id) {
    try {
      let response = await fetch(
        `${config.rest_uri_v2}school/student?artist=${id}`
      );
      let data = await response.json();

      student.value = data;
    } catch (err) {
      student.value = {};
    }
  }

  onBeforeMount(async () => {
    // await the artist data for get the user url to not exec the function getUser inside
    await getArtist(artistId);

    getUser(getId(artist.value.user));

    getArtworks(artistId);

    getStudent(artistId);
  });

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