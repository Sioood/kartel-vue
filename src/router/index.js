import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Check all needed redirects for avoid blank page
  routes: [
    /**
    
      Catch wrong route to redirect. To home for now
    
    **/
    {
      path: "/:pathMatch(.*)*",
      name: "home",
      component: () => import("../pages/HomePage.vue"),
    },

    /**
     *
     *  AUTH
     *
     */

    {
      path: "/auth",
      name: "auth",
      component: () => import("../pages/AuthPage.vue"),
    },

    /**
    
      Routes
    
    **/
    {
      path: "/",
      name: "home",
      component: () => import("../pages/HomePage.vue"),
      meta: {
        title: "Kartel",
      },
    },
    {
      // mettre la schoolview en componenent dans une view pour mieux agencer le tout ->
      // contrer le problème du fixed sur la liste promo, donner des valeurs précise de position padding etc
      path: "/school",
      name: "school",
      component: () => import("../pages/school/SchoolPage.vue"),
      meta: {
        title: "Liste des promotions - Kartel",
      },
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
      path: "/school/student/:id",
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
    {
      path: "/artists",
      name: "artists",
      component: () => import("../pages/ContentList.vue"),
      meta: {
        title: "Artistes - Kartel",
      },
    },
    {
      path: "/artist/:id",
      name: "artist",
      component: () => import("../pages/ArtistProfil.vue"),
      meta: {
        title: "Artiste - Kartel",
      },
    },
    {
      path: "/artworks",
      name: "artworks",
      component: () => import("../pages/ContentList.vue"),
      meta: {
        title: "Œuvres - Kartel",
      },
    },
    {
      path: "/artwork/:id",
      name: "artwork",
      component: () => import("../pages/artwork/ArtworkPage.vue"),
      meta: {
        title: "Œuvre - Kartel",
      },
    },
    // For visualisation but need to be children of artist and artwork
    {
      path: "/media",
      name: "media",
      component: () => import("../components/MediaDetails.vue"),
    },

    /**
    
      test composable
    
    **/

    {
      path: "/test",
      name: "test",
      component: () =>
        import("../__examples__/__test__/ComponentComposables.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? "Kartel";
});
