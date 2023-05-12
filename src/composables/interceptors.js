import axios from "axios";

import { ref, watch } from "vue";

/**
 * @type {array} requests - store the requests for a time period, clean after a timeout when all requests are completed
 */
let requests = ref([]);

/**
 * @type {object} load - the status of the loader
 * @property {boolean} status - the status of the loader
 * @property {number} progress - the percentage of the requests completed
 */
let load = ref({
  status: false,
  progress: 0,
});

/**
 *
 * @returns {boolean} requestsStatus - the status of the requests
 */
const requestsStatus = () => {
  let status = requests.value.filter((request) => !request.completed);

  return !status[0] ? true : false;
};

/**
 * call the total requests which are not completed
 *
 * @returns {number} percentage - the percentage of the requests completed
 */
const requestsProgress = () => {
  let total = requests.value.length;

  let completed = requests.value.filter((request) => request.completed);

  // percentage can be another value like 95 for prevent the loader to appear on the screen with a minimum of width
  // -> min-width(5%) + max-percentage(95%) = 100%
  let percentage = (100 * completed.length) / total;

  return (load.value.progress = percentage);
};

// watch the total requests which are not completed and watch if all are completed and actualise the load
/**
 * Watch the requests, update the load status and the load progress
 *
 * @helpers https://stackoverflow.com/questions/71344321/how-can-i-reset-the-value-of-a-ref-and-keep-an-associated-watcher-working
 */
watch(
  requests,
  () => {
    requestsStatus() ? (load.value.status = false) : (load.value.status = true);

    if (requests.value[0]) {
      requestsProgress();
    }
  },
  { deep: true }
);

/**
 * @typedef {object} timeout - declare the timeout external to the watch
 */
let timeout = 0;

/**
 * Watch which can control the reset of the load progress and the animation of it
 */
watch(
  load,
  (newValue) => {
    if (!newValue.status) {
      // abort existing timer and set another one -> prevent new requests with a close timing to start another timer
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        load.value.progress = 0;
      }, 100);
    }
  },
  { deep: true }
);

/**
 * Class to manage the requests
 */
class Request {
  /**
   * Set the properties.
   * @param {string} url - the url of the request
   */
  constructor(url) {
    this.url = url;
    this.completed = false;
  }
}

/**
 *
 * @param {object} config - the config of the request
 */
function atRequest(config) {
  // instance the loader to show loading
  if (!requests.value[0]) {
    load.value.status = true;
  }

  // create a new request and add it to the requests array
  let request = new Request(config.url);
  requests.value.push(request);
}

/**
 *
 * @param {object} response - the response of the request
 */
function atResponse(response) {
  // find the request in the requests array based on the url -> based on a uuid is better for multiple requests with the same url
  // can be current time of generate uuid in Class but canno't be in response ?!

  // request.completed can overide already ended request and can be an alternative to id
  // because we don't care of the specific request we care about the total of requests completed
  let index = requests.value.findIndex(
    (request) => request.url === response.config.url && !request.completed
  );
  requests.value[index].completed = true;

  // clean the requests array if all requests are completed after 3 seconds to prevent new requests with a close timing
  setTimeout(() => {
    if (requestsStatus() && requests.value[0]) {
      requests.value = [];
    }
  }, 3000);
}

/**
 * set the requests interceptors and execute a function at the beginning of a request
 * return config,error,response... is mandatory to execute the interceptors
 */
axios.interceptors.request.use(
  function (config) {
    atRequest(config);

    return config;
  },
  function (error) {
    atRequest(error.config);

    return Promise.reject(error);
  }
);

/**
 * End interceptor which execute function when a request is completed
 */
axios.interceptors.response.use(
  function (response) {
    atResponse(response);

    return response;
  },
  function (error) {
    // handle 401 status response like wrong token auth
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // reload the page to begin navigation as an anonymous user
      window.location.reload();

      // can be a automatic redirect to auth
      // window.location.href = "/auth";
    }

    atResponse(error.response);

    return Promise.reject(error);
  }
);

/**
 * @export {object} load - the status of the loader
 */
export { load };
