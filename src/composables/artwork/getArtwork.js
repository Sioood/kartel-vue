/**
 * Config
 */
import axios from "axios";

/**
 * Modules
 */
import { ref } from "vue";

/**
 * Composable
 */
import toCamelCase from "@/composables/toCamelCase";

/**
 * @type {object} artwork - the artwork
 * @type {array} authorsStore - the authors
 * @type {object} galleries - the galleries
 * @type {array} genres - the genres
 * @type {array} events - the events
 */
let artwork = ref();
let authorsStore = ref();
let galleries = ref({});
let genres = ref([]);
let events = ref([]);

function resetValues() {
  artwork.value = {};
  authorsStore.value = {};
  galleries.value = {};
  genres.value = [];
  events.value = [];
}

/**
 * Get the artwork and run all the function to get the rest of info
 *
 * @param {number} id - id of the artwork
 */
async function getArtwork(id) {
  // shit way to reset values and avoid duplicate data
  resetValues();

  try {
    const response = await axios.get(`production/artwork/${id}`);

    const data = response.data;

    artwork.value = data;

    getAuthors(data.authors);

    /**
     * Get the rest of info about the artwork
     */
    getGalleries(data);

    getGenres(data.genres);

    getDiffusions(data.diffusion);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Get all galleries and run getGallery function to get the data of each gallery and set it to the specific galleries value (galleries.processGallery...)
 *
 *
 * @param {object} data - the artwork
 */
function getGalleries(data) {
  let galleriesKeys = [];

  Object.keys(data).forEach((key) => {
    if (key.includes("galleries")) galleriesKeys.push(key);
  });

  let galleriesKeysCamel = galleriesKeys.map((key) => toCamelCase(key));

  // console.log(galleriesKeys[0], galleriesKeysCamel[0]);

  // get data of each gallery and set it to galleries
  for (let [index, gallery] of galleriesKeys.entries()) {
    // gallery Camel work with index but might be good to check with includes or something for 100% certification of the same gallery

    galleries.value[galleriesKeysCamel[index]] = [];
    data[gallery].forEach((el) => {
      getGallery(el, galleries.value[galleriesKeysCamel[index]]);
    });
  }
}

/**
 *
 * @param {string} url - url of the gallery for the fetch
 * @param {variable} output
 */
async function getGallery(url, output) {
  try {
    const response = await axios.get(url);

    let data = response.data;

    data.mediaData = [];

    if (data?.media) {
      data.media.forEach((el) => {
        getMedia(el, data, output);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function getMedia(url, galleryData, output) {
  try {
    const response = await axios.get(url);

    const data = response.data;

    galleryData.mediaData.push(data);

    // Check index of data.media for push in galleries only when all media is here
    // prevent multipushing and duplicate medias
    let index = 1;

    if (index === galleryData.media.length) {
      output.push(galleryData);
    } else {
      index++;
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Get authors of the specific artwork
 *
 * @param {array} authors
 */
async function getAuthors(authors) {
  let authorsData = authors.map(async (author) => {
    try {
      const response = await axios.get(author);

      const data = response.data;

      if (!data.nickname) {
        data.username = await getUsername(data.user);
      }

      return data;
    } catch (err) {
      console.error(err);
      return {};
    }
  });

  authorsStore.value = await Promise.all(authorsData);
}

/**
 * Get the user and return the username which combine the first name and last name
 *
 * @param {string} url
 */
async function getUsername(url) {
  try {
    const response = await axios.get(url);

    const data = response.data;

    return `${data.first_name} ${data.last_name}`;
  } catch (err) {
    console.error(err);
  }
}

/**
 * For each genre get the genre with the getGenre function
 *
 * @param {array} data
 */
function getGenres(data) {
  if (data) {
    data.forEach((genre) => {
      getGenre(genre);
    });
  }
}

/**
 * Get the genre
 *
 * @param {string} genre
 */
async function getGenre(genre) {
  try {
    const response = await axios.get(genre);

    const data = response.data;
    

    genres.value.push(data);
  } catch (err) {
    console.error(err);
  }
}

/**
 * For each diffusion get the diffusion with the getDiffusion function
 *
 * @param {array} diffusions
 */
function getDiffusions(diffusions) {
  if (diffusions) {
    diffusions.forEach((diffusion) => {
      getDiffusion(diffusion);
    });
  }
}

/**
 * Get the diffusion
 *
 * @param {string} diffusion
 */
async function getDiffusion(diffusion) {
  try {
    const response = await axios.get(diffusion);

    const data = response.data;

    getEvent(data.event);
  } catch (err) {
    console.error(err);
  }
}

async function getEvent(event) {
  try {
    const response = await axios.get(event);

    const data = response.data;

    events.value.push(data);
  } catch (err) {
    console.error(err);
  }
}

export { getArtwork, artwork, authorsStore, galleries, genres, events };
