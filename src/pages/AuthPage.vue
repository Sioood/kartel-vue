<script setup>
import config from "@/config";
import { useRouter } from "vue-router";

import { ref } from "vue";

import { login, message } from "@/composables/auth/auth";

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
let username = ref("");
let password = ref("");
</script>

<template>
  <main class="w-full min-h-[75vh] flex items-center justify-center">
    <div class="flex flex-col items-start justify-center divide-y">
      <UnderlineTitle title="Se connecter" :fontSize="2" class="p-1 mb-2" />

      <form
        class="pt-8 flex flex-col items-end gap-3"
        @submit.prevent="login(username, password, router)"
      >
        <UiInput
          :label="$t('username')"
          :required="true"
          pattern="\S{3,}"
          inputTitle="Le nom d'utilisateur doit contenir au moins 3 caractères"
          placeholder="Kartel"
          type="text"
          @update:value="(value) => (username = value)"
        ></UiInput>
        <UiInput
          :label="$t('password')"
          :required="true"
          pattern="\S{3,}"
          inputTitle="Le mot de passe doit contenir au moins 3 caractères"
          :placeholder="$t('password')"
          type="password"
          @update:value="(value) => (password = value)"
        ></UiInput>
        <div class="mt-4 w-full flex items-center justify-between">
          <a
            :href="`${config.api_url}account/reset_password/`"
            class="p-2 text-sm underline"
            >Mot de passe oublié ?</a
          >
          <AppButton type="submit">connexion</AppButton>
        </div>
        <span
          class="w-72 flex items-center justify-center text-sm break-words"
          :class="{
            'text-red-400': message.status === 'error',
            'text-black': message.status === 'normal',
          }"
          >{{ message.data }}</span
        >
      </form>
    </div>
  </main>
</template>

<style scoped></style>
