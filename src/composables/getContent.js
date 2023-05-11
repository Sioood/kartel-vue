import axios from "axios";

import { ref } from "vue";

let content = ref([]);

// don't know if the offset will reset after each call of the composables ?! May not but ?!
//  get header for get next
let offset = ref(1);

let load = ref(true);

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

// let contentRequests = new Map();

class Content {
  // requests params setup
  static pageSize = 20;

  static requests = new Map();

  /**
   * Checks if the given lastRequest object is the same as the currentRequest object.
   *
   * @param {Object} lastRequest - The last request object to compare.
   * @param {Object} currentRequest - The current request object to compare.
   * @returns {boolean} - True if the lastRequest and currentRequest have the same id and type, false otherwise.
   */
  static isLastRequest(lastRequest, currentRequest) {
    return (
      lastRequest.id === currentRequest.id &&
      lastRequest.type === currentRequest.type
    );
  }

  constructor(type, parameters) {
    this.type = type;
    this.parameters = parameters;
    this.id = Content.requests.size + 1;
    this.url;

    this.setParamsByType(this.type, this.parameters);

    Content.requests.set(this.id, { type, id: this.id, url: this.url });
  }

  setParamsByType(type, parameters) {
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
        // genres: genres ? `genres=${genres}` : null,
        keywords: keywords ? `keywords=${keywords}` : null,
        productionYear: productionYear
          ? `production_year=${productionYear}`
          : null,
        query: q ? `q=${q}` : null,
        // shootingPlace: shootingPlace ? `shooting_place=${shootingPlace}` : null,
        type: type ? `type=${type}` : null,
      };

      setParams(params);

      return (this.url = `production/artwork?page_size=${Content.pageSize}&page=${offset.value}${stringParams}`);
    } else if (type === "artists") {
      const { q, nationality, guests } = parameters;

      /**
       * Artist parameters
       * @typedef {Object} params
       * @property {string} query - q string from function parameters
       * @property {string} nationality
       */
      params = {
        query: q ? `q=${q}` : null,
        nationality: nationality ? `nationality=${nationality}` : null,
        guests:
          guests === "true"
            ? `artworks__isnull=false&student__isnull=true`
            : `artworks__isnull=false`,
      };

      setParams(params);

      return (this.url = `people/artist?page_size=${Content.pageSize}&page=${offset.value}${stringParams}`);
    }
  }

  /**
   * Fetches content from a given URL and type.
   * @param {string} url - The URL to fetch content from.
   * @param {string} type - The type of content to fetch.
   */
  async fetchContent(url, type) {
    try {
      // need to double verif before the second requests with contentData

      const response = await axios.get(url);

      let data = response.data;

      // check if it's the last request to set results
      if (Content.isLastRequest(this.getLastRequest(), { type, id: this.id })) {
        if (
          data &&
          Array.isArray(data) &&
          data !== { details: "Page non valide." }
        ) {
          let contentData;

          if (type === "artists") {
            contentData = await Promise.all(this.contentData(data));
          } else {
            contentData = data;
          }

          // second verification of it is the last request because timing can pass and request contentData
          if (
            Content.isLastRequest(this.getLastRequest(), { type, id: this.id })
          ) {
            content.value = [...content.value, ...contentData];
            offset.value++;
          }

          load.value = true;
        }
      }
    } catch (err) {
      console.error(err);

      // catch 404 and stop observer -> if the method change from offset to next headers it will be much easier to handle the observer
      if (err.response.status === 404) {
        load.value = false;
      }
    }
  }

  /**
   * Get the content data for each content in data and return a promise
   *
   * @param {Array<Object>} data - An array of data objects.
   * @returns {Array<Promise<Object>>} - An array of promises that resolve to the
   * transformed data objects. The promises may reject if the GET request fails.
   */
  contentData(data) {
    return data.map(async (data) => {
      try {
        const response = await axios.get(data.user);
        let userData = response.data;

        data.userData = userData;
        return data;
      } catch (err) {
        console.log(err);

        return data;
      }
    });
  }

  /**
   * Returns the last request of Content.
   *
   * @returns {object} The last request made, or undefined if no request was made.
   */
  getLastRequest() {
    return Array.from(Content.requests.values()).pop();
  }
}

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

  // create a new content
  const newContent = new Content(type, parameters);

  // fetch the content with instance function (not doing that inside the constructor because can deal with async await)
  return await newContent.fetchContent(newContent.url, newContent.type);
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
