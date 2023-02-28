import ArtworkCard from "../artwork/ArtworkCard.vue";

import config from "@/config";

import "@/main";

describe("Artwork card", () => {
  it("Check props", () => {
    let data = {
      url: "/artwork/1",
      picture: `${config.api_url}src/assets/logo-Fresnoy-transparent.png`,
      title: "Hello Cypress",
    };
    cy.mount(ArtworkCard, {
      props: { url: data.url, picture: data.picture, title: data.title },
    });

    cy.get("router-link")
      .should("exist")
      .should("have.attr", "to")
      .and("include", data.url);

    cy.get("img")
      .should("exist")
      .should("have.attr", "src")
      .and("include", data.picture);

    cy.get("img").should("have.attr", "alt").and("include", data.title);

    cy.get(".text-xs").should("exist").contains(data.title);
  });
});
