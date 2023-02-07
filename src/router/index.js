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
      // mettre la schoolview en componenent dans une view pour mieux agencer le tout ->
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
      path: "/school/artist",
      // Maybe replace with the artist page in the future
      redirect: "/school",
    },
    {
      // promotion will be rendered inside School's <router-view> (Don't forget the router-view element to render children)
      // when /school/promotion/:id is matched
      path: "/school/artist/:id",
      name: "student",
      component: () => import("../pages/school/StudentProfil.vue"),
      children: [
        {
          path: "/school/artist/:id",
          name: "navigation",
          component: () => import("../components/ProfileNavigation.vue"),
        },
        // {
        //   path: "/artwork/:id",
        //   name: "navigation",
        //   component: () => import(""),
        // },
      ],
    },
    // For visualisation but need to be children of artist and artwork
    {
      path: "/media",
      name: "media",
      component: () => import("../components/MediaDetails.vue"),
    },
  ],
});

export default router;
