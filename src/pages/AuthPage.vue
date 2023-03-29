<script setup>
import config from "@/config";

import { ref } from "vue";
/**
 *
 *  COMPONENTS
 *
 */

import UnderlineTitle from "../components/ui/UnderlineTitle.vue";
import UiInput from "../components/ui/UiInput.vue";
import AppButton from "../components/ui/AppButton.vue";

let username = ref();
let password = ref();

async function auth() {
  // valid inputs before

  const body = {
    username: username.value,
    password: password.value,
  };

  console.log(JSON.stringify(body));

  try {
    const response = await fetch(
      `${config.rest_uri_v2}rest-auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify(body),
        },
      }
    );
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center">
    <div class="flex flex-col items-start justify-center divide-y">
      <UnderlineTitle title="Se connecter" :fontSize="2" class="p-1 mb-2" />

      <form action="" class="pt-8 flex flex-col items-end gap-3">
        <UiInput
          label="username"
          placeholder="Kartel"
          type="text"
          @update:value="(value) => (username = value)"
        ></UiInput>
        <UiInput
          label="password"
          placeholder="Mot de passe"
          type="password"
          @update:value="(value) => (password = value)"
        ></UiInput>
        <AppButton class="mt-4" type="submit" @click.prevent="auth()">connexion</AppButton>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
