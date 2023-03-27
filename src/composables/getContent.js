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

let url;
let stringParams;
let params = {};

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

    // set params for the request
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

    url = `${config.rest_uri_v2}production/artwork?page_size=20&page=${offset.value}${stringParams}`;
  } else if (type === "artists") {
    const { q, nationality } = parameters;

    // set params for the request
    params = {
      query: q ? `q=${q}` : null,
      nationality: nationality ? `nationality=${nationality}` : null,
    };

    setParams(params);

    url = `${config.rest_uri_v2}people/artist?page_size=20&page=${offset.value}${stringParams}`;
  }

  console.log(stringParams);

  try {
    console.log(url);
    let response = await fetch(url);

    let data = await response.json();

    if (data && data !== { details: "Page non valide." }) {
      // can be a simple for loop -> better for async operation
      // data.forEach((contentData) => {
      //   content.value.push(contentData);
      // });

      for (let contentData of data) {
        if (type === "artists") {
          try {
            let response = await fetch(contentData.user);

            let userData = await response.json();

            contentData.userData = userData;

            // console.log(userData);
          } catch (err) {
            console.log(err);
          }
        }

        content.value.push(contentData);
      }

      offset.value++;
    }
  } catch (err) {
    console.log(err);
  }

  load.value = true;
}

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
