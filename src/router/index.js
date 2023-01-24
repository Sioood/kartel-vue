import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/school",
      name: "school",
      component: () => import("../views/SchoolView.vue"),
    },
    {
      path: "/school/promotion/:id",
      name: "promotion",
      component: () => import("../views/SchoolView.vue"),
    },
  ],
});

export default router;
