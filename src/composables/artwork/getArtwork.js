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

/**
 * Initializes the values of the artwork, authorsStore, galleries, genres, and
 * events variables to empty objects or arrays.
 */
function initValues() {
  artwork.value = {};
  authorsStore.value = {};
  galleries.value = {};
  genres.value = [];
  events.value = [];
  Media.index = new Map();
}

/**
 * Get the artwork and run all the function to get the rest of info
 *
 * @param {number} id - id of the artwork
 */
async function getArtwork(id) {
  initValues();

  try {
    const response = await axios.get(`production/artwork/${id}`);

    const data = response.data;

    artwork.value = data;

    await getAuthors(data.authors);

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
      data.media.forEach((url) => {
        new Media(url, data, output);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Media class for fetching media of a specific gallery
 */
class Media {
  static index = new Map();

  constructor(url, galleryData, output) {
    this.url = url;
    this.galleryData = galleryData;
    this.output = output;

    this._fetchMedia(this.url, this.galleryData, this.output);
  }

  /**
   * Get a specific gallery from index Map
   * @returns {object} - object from the index Map with the gallery id
   */
  indexData = () => Media.index.get(this.galleryData.id);

  /**
   * Set a gallery in index Map with the gallery id the media offset and the total of media needed
   * @param {boolean} increment
   */
  indexSet = (increment) => {
    Media.index.set(this.galleryData.id, {
      id: this.galleryData.id,
      medias: increment ? this.indexData().medias + 1 : 1,
      total: this.galleryData.media.length,
    });
  };

  /**
   * Fetches media data from the given URL and updates the galleryData and output
   * arrays as necessary.
   *
   * @param {string} url - The URL to fetch media data from.
   * @param {Object} galleryData - The galleryData object to update with the fetched
   * media data.
   * @param {Array} output - The output array to update with the galleryData object
   * if all media data has been fetched.
   * @returns {Promise} - A promise that resolves when the media data has been fetched
   * and the galleryData and output arrays have been updated.
   * @throws {Error} - If there is an error fetching the media data.
   */
  async _fetchMedia(url, galleryData, output) {
    try {
      const response = await axios.get(url);

      const data = response.data;

      galleryData.mediaData.push(data);

      if (Media.index.has(galleryData.id)) {
        this.indexSet(true);
      } else {
        this.indexSet();
      }

      if (this.indexData().medias === this.indexData().total) {
        output.push(galleryData);
      }
    } catch (err) {
      console.error(err);
    }
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

    await getEvent(data.event);
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

export {
  getArtwork,
  artwork,
  authorsStore,
  galleries,
  genres,
  events,
  initValues,
  getAuthors,
  getUsername,
  getGalleries,
  getGenres,
  getGenre,
  getDiffusions,
  getDiffusion,
  getEvent,
  Media,
};
