<script setup>
import { toRefs } from "vue";
import { user as auth, logout } from "@/composables/auth/auth";

import { useRouter } from "vue-router";
const router = useRouter();

const { user, token } = toRefs(auth.value);
</script>
<template>
  <div class="inline-flex items-center justify-center gap-1">
    <h5 v-if="user" class="text-base font-semibold capitalize">
      {{  `${user.first_name} ${user.last_name}` }}
    </h5>
    <router-link
      v-if="!token"
      to="/auth"
      class="p-2 hover:bg-black-extralightest"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
          fill="rgba(0,0,0,1)"
        />
      </svg>
    </router-link>

    <button
      v-else
      class="p-2 hover:bg-black-extralightest"
      @click="logout(router)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
          fill="#000"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
