<script setup>
import config from "@/config";
import { useRouter } from "vue-router";

import { ref } from "vue";

/**
 *
 *  COMPONENTS
 *
 */

import UnderlineTitle from "../components/ui/UnderlineTitle.vue";
import UiInput from "../components/ui/UiInput.vue";
import AppButton from "../components/ui/AppButton.vue";

const router = useRouter();

/**
 * @type {string} username
 * @type {string} password
 */
let username = ref();
let password = ref();

async function auth() {
  // valid inputs before

  /**
   * @type {object} body - to send with the post request
   * @property {string} username - property from ref
   * @property {string} password - property from ref
   */
  const body = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch(`${config.rest_uri_v2}rest-auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();

    if (data?.token) {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies secure way
      // https://dev.to/bcerati/les-cookies-httponly-une-securite-pour-vos-tokens-2p8n
      localStorage.setItem("token", data.token);

      // go on the previous page after successful login
      router.go(-1);
    }
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center">
    <div class="flex flex-col items-start justify-center divide-y">
      <UnderlineTitle title="Se connecter" :fontSize="2" class="p-1 mb-2" />

      <form
        class="pt-8 flex flex-col items-end gap-3"
        @submit.prevent="auth()"
      >
        <UiInput
          label="username"
          :required="true"
          pattern="\w{3,16}"
          inputTitle="Le nom d'utilisateur doit contenir au moins 3 caractères"
          placeholder="Kartel"
          type="text"
          @update:value="(value) => (username = value)"
        ></UiInput>
        <UiInput
          label="password"
          :required="true"
          pattern="\w{3,16}"
          inputTitle="Le mot de passe doit contenir au moins 3 caractères"
          placeholder="Mot de passe"
          type="password"
          @update:value="(value) => (password = value)"
        ></UiInput>
        <AppButton class="mt-4" type="submit">connexion</AppButton>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
