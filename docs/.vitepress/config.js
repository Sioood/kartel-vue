export default {
  title: "— Kartel",
  description: "Documentation de l'outil Kartel du Fresnoy",
  head: [
    [
      "link",
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
    ],
    [
      "link",
      { rel: "icon", type: "ico", sizes: "32x32", href: "/favicon.ico" },
    ],
    [
      "link",
      { rel: "icon", type: "ico", sizes: "16x16", href: "/favicon.ico" },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: "https://kartel.lefresnoy.net/images/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Getting Started", link: "/getting-started/getting-started" },
      { text: "Contact", link: "/contact" },
      {
        text: "Repositories",
        items: [
          {
            text: "Le Fresnoy",
            link: "https://www.lefresnoy.net/",
          },
          {
            // Title for the section.
            text: "Link",
            items: [
              { text: "Kart", link: "https://github.com/Sioood/kartel-vue" },
              {
                text: "Kartel",
                link: "https://github.com/Sioood/kartel-vue",
              },
            ],
          },
        ],
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Le Fresnoy — Kartel", link: "/about" },
          {
            text: "Getting Started",
            link: "/getting-started/getting-started",
          },
          // {
          //   text: "Folder",
          //   items: [
          //     { text: "Folder file", link: "/folder/folder-file" },
          //     {
          //       text: "Subfolder",
          //       items: [
          //         { text: "Sub file", link: "/folder/subfolder/sub-file" },
          //       ],
          //       collapsible: true,
          //       collapsed: false,
          //     },
          //   ],
          //   collapsible: true,
          //   collapsed: false,
          // },
        ],
        collapsible: true,
        collapsed: false,
      },
      {
        text: "Kartel",
        items: [
          {
            text: "Sitemap",
            link: "/kartel/sitemap",
            collapsible: false,
            collapsed: false,
          },
          {
            text: "UI",
            link: "/kartel/ui",
            items: [
              {
                text: "Buttons",
                link: "/kartel/ui#buttons-et-inputs",
              },
              {
                text: "Divers",
                link: "/kartel/ui#divers",
              },
            ],
            collapsible: true,
            collapsed: false,
          },
        ],
        collapsible: true,
        collapsed: false,
      },
      {
        text: "Kart",
        items: [
          {
            text: "API",
            link: "/kart/api",
            items: [
              {
                text: "Root",
                link: "/kart/api#root",
              },
              {
                text: "People",
                link: "/kart/api#people",
              },
              {
                text: "School",
                link: "/kart/api#school",
              },
              {
                text: "Production",
                link: "/kart/api#production",
              },
              {
                text: "Diffusion",
                link: "/kart/api#diffusion",
              },
              {
                text: "Commons",
                link: "/kart/api#commons",
              },
              {
                text: "Assets",
                link: "/kart/api#assets",
              },
            ],
            collapsible: true,
            collapsed: false,
          },
        ],
        collapsible: true,
        collapsed: false,
      },
      {
        text: "Tester l'application",
        link: "/test/test",

        items: [
          {
            text: "Test",
            link: "/test/test",
          },
          {
            text: "Vitest",
            link: "/test/vitest",
          },
          {
            text: "Cypress",
            link: "/test/cypress",
          },
          {
            text: "Coverage",
            link: "/test/coverage",
          },
        ],
      },
    ],
    editLink: {
      // Modify with the future repository
      pattern: "https://github.com/Sioood/kartel-vue/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Fresnoy" }],
    footer: {
      message:
        'Released under the <a href="https://www.gnu.org/licenses/">AGPL-3.0 license</a>.',
      copyright:
        'Copyright © 2000-present <a href="https://github.com/Sioood/kartel-vue">— Le Fresnoy</a>',
    },
  },
  lastUpdated: true,
};
