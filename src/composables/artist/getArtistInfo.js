// import all the dependencies of the app, pinia, router... for the test
// There might be a better way
// import "@/main";

import config from "@/config";

import { ref, onBeforeMount } from "vue";
import { useConfigApi } from "@/stores/configApi";

export const getArtistInfo = (artistId) => {
  const storeApi = useConfigApi();

  let artist = ref();
  let artwork = ref();
  let student = ref();
  let user = ref();

  // get artist based on the current route id
  async function getArtist(id) {
    let response = await fetch(`${config.rest_uri_v2}people/artist/${id}`);
    let data = await response.json();

    // get user information with the id url of artist.user
    getUser(storeApi.getId(data.user));

    artist.value = data;
  }

  // get user by artist id
  async function getUser(id) {
    let response = await fetch(`${config.rest_uri_v2}people/user/${id}`);
    let data = await response.json();

    user.value = data;
  }

  // get artwork bound to the current artist id
  async function getArtworks(id) {
    let response = await fetch(
      `${config.rest_uri_v2}production/artwork?authors=${id}`
    );
    let data = await response.json();

    artwork.value = data;
  }

  // get student by artist id
  async function getStudent(id) {
    let response = await fetch(
      `${config.rest_uri_v2}school/student?artist=${id}`
    );
    let data = await response.json();

    student.value = data;
  }

  onBeforeMount(() => {
    getArtist(artistId);

    getArtworks(artistId);

    getStudent(artistId);
  });

  return {
    // define access to the ref needed inside the template
    artist,
    user,
    artwork,

    // export functions for test
    getArtist,
    getUser,
    getArtworks,
    getStudent,
  };
};
