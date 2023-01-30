export default {
  title: "— Kartel",
  description: "Documentation de l'outil Kartel du Fresnoy",
  themeConfig: {
    logo: "https://kartel.lefresnoy.net/images/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Getting Started", link: "/getting-started/getting-started" },
      { text: "Contact", link: "/contact" },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Le Fresnoy — Kartel", link: "/about" },
          { text: "Getting Started", link: "/getting-started/getting-started" },
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
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
};
