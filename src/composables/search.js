import axios from "axios";

import { ref } from "vue";

let input = ref();

let result = ref({
  // focus is the focus state of the input
  focus: false,
  // open is the state of the result modal, can differ with focus
  open: false,
  // disabled is if user hover the result get out of focus don't close it
  // if focus is false and the user move out of the result open equal false
  // it's for have a way of close/open the results however the user interact
  disabled: false,
});

let artworks = ref([]);
let artists = ref([]);

// too big condition function to be placed in html
// condition for hide the no result message
function hiddenInput() {
  if (input.value) {
    let value = input.value.match(/\w/g) ? false : true;
    if (value === true) {
      return value;
    }

    if (value === false) {
      if (Object.keys(artworks.value).length === 0 || !artists.value[0]) {
        return false;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}

let resultsLength = 3;

let timeout = 0;
// search function for artworks and artists, artists can be added in the future

// trim all space in the start of input ?
// update the input value with space in the start trimed
/**
 * Search artists and artworks from input query
 * @param {string} input
 */
function search(input) {
  if (input.length < 3 || input.replaceAll(" ", "") === "") {
    artworks.value = [];
    artists.value = [];

    return;
  }

  // clean the timeout to set another one a keep only one alive
  clearTimeout(timeout);

  // check after a delay like 300 if input have the same value to prevent spamming
  timeout = setTimeout(() => {
    searchArtists(input);
    searchArtworks(input);
  }, 300);
}

// archive all requests of artists and artworks for only results the lastest with the right id
let instance = {
  artists: new Map(),
  artworks: new Map(),
};

/**
 * Search the artworks and results only if it's the latests requests
 */
class Artworks {
  constructor(query) {
    let index = instance.artworks.size + 1;

    this.id = index;
    instance.artworks.set(index, query);

    this.getArtworks(query);
  }

  /**
   * Async function that retrieves artworks data from kart.
   * @param {string} query - The search query to use.
   */
  async getArtworks(query) {
    try {
      let response = await axios.get(`production/artwork-search?q=${query}&page_size=${resultsLength}`);
      let data = response.data;

      if (this.id === instance.artworks.size) {
        for (let artwork of data) {
          artworks.value.push(new Artwork(artwork));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * Search the artists and results only if it's the latests requests
 */
class Artists {
  constructor(query) {
    let index = instance.artists.size + 1;

    this.id = index;
    instance.artists.set(index, query);

    this.getArtists(query);
  }

  /**
   * Async function that retrieves artists data from kart.
   * @param {string} query - The search query to use.
   */
  async getArtists(query) {
    try {
      let response = await axios.get(`people/artist-search?q=${query}&page_size=${resultsLength}`);
      let data = response.data;

      if (this.id === instance.artists.size) {
        for (let artist of data) {
          artists.value.push(new Artist(artist));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * setup the result of a request and transform object to "this" properties
 */
class Result {
  constructor(result) {
    for (let key in result) {
      this[key] = result[key];
    }
  }
}

/**
 * @extends Result
 * Extends of result with specific functions for the type of result
 */
class Artwork extends Result {
  constructor(artwork) {
    super(artwork);

    this.authorsNames = this.getAuthorsName();
  }

  /**
   * Returns an array of author names, either from the author's nickname or their first and last name.
   * @returns {array} An array of strings containing the names of the authors.
   */
  getAuthorsName() {
    if (!this.authors) {
      return "";
    }

    return this.authors.map((author) => {
      return (
        author.nickname || `${author.user.first_name} ${author.user.last_name}`
      );
    });
  }
}

/**
 * @extends Result
 * Extends of result with specific functions for the type of result
 */
class Artist extends Result {
  constructor(artist) {
    super(artist);
  }

  // set promo ?
}

/**
 * Asynchronously searches for artworks based on the given query, and updates the
 * global `artworks.value` array with the results.
 *
 * @param {string} query - The search query to use.
 */
async function searchArtworks(query) {
  artworks.value = [];

  new Artworks(query);
}

/**
 * Asynchronously searches for artists based on the given query, and updates the
 * global `artists.value` array with the results.
 *
 * @param {string} query - The search query to use.
 */
async function searchArtists(query) {
  artists.value = [];

  new Artists(query);
}

export { input, result, artworks, artists, search, hiddenInput };
