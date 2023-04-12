import config from "@/config";
import axios from "axios";

import { ref } from "vue";

let content = ref([]);

// don't know if the offset will reset after each call of the composables ?! May not but ?!
//  get header for get next
let offset = ref(1);

let load = ref(false);

/**
 * @type {string} url - url for the api request which combine url and query params from stringParams
 */
let url;
let stringParams;
let params = {};

/**
 * AXIOS interceptors to handle the offset of the infinite scroll
 * separate an instance from global axios for specific interceptors
 */
// const instance = axios.create({
//   baseURL: `${config.rest_uri_v2}`,
// });

/**
 * @Helpers https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields - get the headers of the response
 */

/**
 * set the requests interceptors and execute a function at the beginning of a request
 */
// instance.interceptors.request.use(
//   function (config) {
//     // console.log("sending request", config);
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

/**
 * End interceptor which execute function when a request is completed
 */
// instance.interceptors.response.use(
//   function (response) {
//     // get the next and the previous url headers for the offset

//     // console.log("receiving response", response);
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

/**
 *
 *  @param {object} params - the differents params to return
 *
 */
function setParams(params) {
  stringParams = "";
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

  console.log(type);

  // set differents params according to the type of content
  if (type === "artworks") {
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

    setParams(params);

    url = `production/artwork?page_size=20&page=${offset.value}${stringParams}`;
  } else if (type === "artists") {
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

    setParams(params);

    url = `people/artist?page_size=20&page=${offset.value}${stringParams}`;
  }

  try {
    const response = await axios.get(url);

    let data = response.data;

    if (data && Array.isArray(data) && data !== { details: "Page non valide." }) {
      let contentData = data.map(async (data) => {
        if (type === "artists") {
          try {
            const response = await axios.get(data.user);

            let userData = response.data;

            data.userData = userData;

            return data;
            // console.log(userData);
          } catch (err) {
            console.log(err);

            return data;
          }
        } else {
          return data;
        }
      });

      await Promise.all(contentData);

      content.value = [...content.value, ...(await Promise.all(contentData))];

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
export {
  content,
  getContent,
  offset,
  load,
  url,
  params,
  setParams,
  stringParams,
};
