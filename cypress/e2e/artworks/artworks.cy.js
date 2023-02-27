import config from "../../../src/config";

describe("Artworks view", () => {
  it("intercept request of artworks", () => {
    cy.intercept(
      `${config.rest_uri_v2}production/artwork?&page_size=20&page=1`
    ).as("artworks");
    cy.visit("/artworks");

    // check if body exist and if each element of it contains rights properties
    cy.wait("@artworks").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });
  });
});
