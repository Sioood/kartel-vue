import config from "@/config";

import { ref } from "vue";

/**
 *
 * [TODO] Need to be independant to be artist and artwork
 *
 */

let content = ref([]);

// don't know if the offset will reset after each call of the composables ?! May not but ?!
//  get header for get next
let offset = ref(1);

let load = ref(false);

/**
 * @type {string} url - url for the api request which combine url and query params from stringParams
 */
let url;
let stringParams = "";
let params = {};

/**
 * loop which set params in a string into the variable stringParams
 */
function setParams() {
  for (let param in params) {
    params[param] && (stringParams = `${stringParams}&${params[param]}`);
  }
}

// Get artworks, set an observer who fetch the next page
// update params if filters change
// if the filters change reset artworks

/**
 * get a list of content by type
 *
 * @param {string} type
 * @param {object} parameters
 *
 * @example
 *
 *    getContent("artist",  params = {  query: "Something", nationality: "FR" })
 *
 */
async function getContent(type, parameters) {
  // need to pass the type of the get (artist or artwork) and set the params to match them

  // avoid load.value to be false if the observer is intersecting by default in large screen
  // !artworks.value[0] ? (load.value = true) : (load.value = false);
  load.value = false;

  // set differents params according to the type of content
  if (type === "artwork") {
    const { genres, keywords, productionYear, q, shootingPlace, type } =
      parameters;

    /**
     * Artwork parameters
     * @typedef {Object} params
     * @property {string} genres
     * @property {string} keywords
     * @property {string} productionYear
     * @property {string} query - q string from function parameters
     * @property {string} shootingPlace
     * @property {string} type
     */
    params = {
      genres: genres ? `genres=${genres}` : null,
      keywords: keywords ? `keywords=${keywords}` : null,
      productionYear: productionYear
        ? `production_year=${productionYear}`
        : null,
      query: q ? `q=${q}` : null,
      shootingPlace: shootingPlace ? `shooting_place=${shootingPlace}` : null,
      type: type ? `type=${type}` : null,
    };

    setParams();

    url = `${config.rest_uri_v2}production/artwork?page_size=20&page=${offset.value}${stringParams}`;
  } else if (type === "artist") {
    const { q, nationality } = parameters;

    /**
     * Artist parameters
     * @typedef {Object} params
     * @property {string} query - q string from function parameters
     * @property {string} nationality
     */
    params = {
      query: q ? `q=${q}` : null,
      nationality: nationality ? `nationality=${nationality}` : null,
    };

    setParams();

    url = `${config.rest_uri_v2}people/artist?page_size=20&page=${offset.value}${stringParams}`;
  }

  try {
    let response = await fetch(url);

    let data = await response.json();

    if (data) {
      // can be a simple for loop -> better for async operation
      data.forEach((contentData) => {
        content.value.push(contentData);
      });

      offset.value++;
    }
  } catch (err) {
    console.log(err);
  }

  load.value = true;
}

/**
 *  @exports data for access outside
 */
export { content, getContent, offset, load, url, params, stringParams };
