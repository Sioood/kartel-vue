export default {
  title: "— Kartel",
  description: "Documentation de l'outil Kartel du Fresnoy",
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
          {
            text: "Folder",
            items: [
              { text: "Folder file", link: "/folder/folder-file" },
              {
                text: "Subfolder",
                items: [
                  { text: "Sub file", link: "/folder/subfolder/sub-file" },
                ],
                collapsible: true,
                collapsed: false,
              },
            ],
            collapsible: true,
            collapsed: false,
          },
        ],
        collapsible: true,
        collapsed: false,
      },
    ],
    editLink: {
      // Modify with the future repository
      pattern: "https://github.com/Sioood/kartel-vue/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message:
        'Released under the <a href="https://www.gnu.org/licenses/">AGPL-3.0 license</a>.',
      copyright:
        'Copyright © 2000-present <a href="https://github.com/Sioood/kartel-vue">— Le Fresnoy</a>',
    },
  },
  lastUpdated: true,
};
