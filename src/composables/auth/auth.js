import axios from "axios";

import { ref } from "vue";

let message = ref({
  status: "normal",
  data: "",
});

/**
 * @type {object} user - the user ref with his data and the token
 */
let user = ref({
  user: JSON.parse(localStorage.getItem("user")) || "",
  token: localStorage.getItem("token") || "",
});

/**
 * Get user and token from storage and set to ref user
 */
function fromStorageToRef() {
  user.value.user = JSON.parse(localStorage.getItem("user")) || "";
  user.value.token = localStorage.getItem("token") || "";
}

/**
 * Log in the user with the username and password and get his token and some of his data
 * Then store it in the localstorage and the user ref
 *
 * @param {string} username - the username of the user
 * @param {string} password - the password of the user
 * @param {*} router - the router from a vue instance (router cannot be important outside a vue instance)
 */
async function login(username, password, router) {
  // valid inputs before

  /**
   * @type {object} body - to send with the post request
   * @property {string} username - property from ref
   * @property {string} password - property from ref
   */
  const body = {
    username,
    password,
  };

  try {
    const response = await axios.post("rest-auth/login/", {
      ...body,
    });
    const data = response.data;


    if (response.status === 200 && data?.token) {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies secure way
      // https://dev.to/bcerati/les-cookies-httponly-une-securite-pour-vos-tokens-2p8n
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      fromStorageToRef();

      router.go(-1);
    }
  } catch (err) {
    console.error(err);

    if (err.response.status === 400) {
      message.value.status = "error";
      message.value.data = err.response.data.non_field_errors[0];
    }
  }
}

/**
 *
 * @param {*} router - the router from a vue instance (router cannot be important outside a vue instance)
 */
function logout(router) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  fromStorageToRef();

  router.go(0);
}

export { message, user, login, logout, fromStorageToRef };
