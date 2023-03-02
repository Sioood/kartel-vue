import UiMedia from "../ui/UiMedia.vue";

import config from "@/config";

import "@/main";

describe("Artwork card", () => {
  it("Check props", () => {
    let data = {
      url: `${config.api_url}src/assets/logo-Fresnoy-transparent.png`,
      medium: null,
      title: "Hello Cypress",
    };
    cy.mount(UiMedia, {
      props: { url: data.url, medium: data.medium, title: data.title },
    });

    cy.get("img")
      .should("exist")
      .should("have.attr", "src")
      .and("include", data.url);

    cy.get("img").should("have.attr", "alt").and("include", data.title);

    cy.get(".text-xs").should("exist").contains(data.title);

    // Need to test the lightbox galleries but not necessarily in component but maybe with multiple medias
  });
});
