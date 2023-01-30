import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Check all needed redirects for avoid blank page
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      // mettre la schoolview en componenet dans une view pour mieux agencer le tout ->
      // contrer le problème du fixed sur la liste promo, donner des valeurs précise de position padding etc
      path: "/school",
      name: "school",
      component: () => import("../views/SchoolView.vue"),
      children: [
        {
          // promotion will be rendered inside School's <router-view> (Don't forget the router-view element to render children)
          // when /school/promotion/:id is matched
          path: "promotion/:id",
          name: "promotion",
          component: () => import("../components/school/PromotionStudents.vue"),
        },
      ],
    },
    {
      // promotion will be rendered inside School's <router-view> (Don't forget the router-view element to render children)
      // when /school/promotion/:id is matched
      path: "/school/artist/:id",
      name: "student",
      component: () => import("../components/school/StudentProfil.vue"),
    },
    // {
    //   path: "/school/promotion/:id",
    //   name: "promotion",
    //   component: () => import("../components/PromotionStudents.vue"),
    // },
    // {
    //   path: "/school/promotion/:id",
    //   name: "promotion",
    //   component: () => import("../views/SchoolView.vue"),
    // },
  ],
});

export default router;
