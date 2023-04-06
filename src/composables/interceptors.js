import axios from "axios";

import { ref, watch } from "vue";

let call = 0;

let requests = ref([]);

let load = ref({
  status: false,
  progress: 0,
});

// watch the total requests which are not finished and watch if all are completed and actualise the load
watch(requests.value, () => {
  let requestStatus = requests.value.filter((request) => {
    !request.finished;
  });

  !requestStatus[0] ? (load.value.status = false) : (load.value.status = true);
});

class Request {
  constructor(url) {
    this.url = url;
    this.finished = false;
  }
}

axios.interceptors.request.use(
  function (config) {
    // instance the loader to show loading
    if (requests.value.length === 0) {
      load.value.status = true;
    }

    call++;

    // create a new request and add it to the requests array
    let request = new Request(config.url);
    requests.value.push(request);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("end", response);

    // find the request in the requests array based on the url -> based on a uuid is better for multiple requests with the same url
    // can be current time of generate uuid in Class but canno't be in response ?!

    // request.finished can overide already ended request and can be an alternative to id
    // because we don't care of the specific request we care about the total of requests finished
    let index = requests.value.findIndex(
      (request) => request.url === response.config.url && !request.finished
    );
    requests.value[index].finished = true;

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { load };
