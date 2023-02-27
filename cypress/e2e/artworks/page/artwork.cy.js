import config from "../../../../src/config";

describe("Artwork specific page", () => {
  it("intercept request of artworks", () => {
    cy.intercept(`${config.rest_uri_v2}production/artwork/*`).as("artwork");
    // intercept the rest, diffusion, authors, partners, galleries....
    cy.visit("/artwork/1286");

    cy.wait("@artwork").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});
