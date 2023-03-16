import config from "@/config";

import { ref } from "vue";

let artworks = ref([]);

// don't know if the offset will reset after each call of the composables ?! May not but ?!
//  get header for get next
let offset = ref(1);

let load = ref(false);

// Get artworks, set an observer who fetch the next page
// update params if filters change
// if the filters change reset artworks
async function getArtworks(parameters) {
  const { genres, keywords, productionYear, q, shootingPlace, type } = parameters;

  // avoid load.value to be false if the observer is intersecting by default in large screen
  // !artworks.value[0] ? (load.value = true) : (load.value = false);
  load.value = false

  // set params for the request
  let params = {
    genres: genres ? `genres=${genres}` : null,
    keywords: keywords ? `keywords=${keywords}` : null,
    productionYear: productionYear ? `production_year=${productionYear}` : null,
    query: q ? `q=${q}` : null,
    shootingPlace: shootingPlace ? `shooting_place=${shootingPlace}` : null,
    type: type ? `production_year=${type}` : null,
  };

  let stringParams = "";

  for (let param in params) {
    params[param] && (stringParams = `${stringParams}&${params[param]}`);
    console.log(stringParams);
  }

  try {
    let response = await fetch(
      `${config.rest_uri_v2}production/artwork?page_size=20&page=${offset.value}${stringParams}`
    );

    let data = await response.json();

    if (data) {
      // can be a simple for loop -> better for async operation
      data.forEach((artwork) => {
        artworks.value.push(artwork);
      });
    }
  } catch (err) {
    console.log(err);
  }

  offset.value++;
  load.value = true;
}

export { artworks, getArtworks, offset, load };
