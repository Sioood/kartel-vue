import config from "../../../src/config";

describe("Explore the search feature which result students and artworks", () => {
  context("Test in home page", () => {
    function testSearch(search, type) {
      cy.get(search).type(type);

      cy.wait("@artwork-search").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;
      });

      cy.wait("@student-search").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;
      });

      cy.get('[data-test="nav-link"] > .link').last().click();

      cy.location().should((loc) => {
        // for artist or artwork, need to find a way to conditional with cypress
        expect(loc.pathname).to.match(/art/);
      });
    }

    it("expect to work in home", () => {
      cy.viewport(1280, 720);

      cy.intercept(`${config.rest_uri_v2}production/artwork-search*`).as(
        "artwork-search"
      );
      cy.intercept(`${config.rest_uri_v2}school/student-search*`).as(
        "student-search"
      );

      cy.visit("/");

      testSearch('[data-test="search"]', "mer");
    });

    it("expect to work in others pages", () => {
      cy.viewport(1280, 720);

      cy.intercept(`${config.rest_uri_v2}production/artwork-search*`).as(
        "artwork-search"
      );
      cy.intercept(`${config.rest_uri_v2}school/student-search*`).as(
        "student-search"
      );
      cy.visit("/");

      // cy.get('[data-test="nav-link"] > .link').and((links) => {
      //   for (let i = 0; i < links.length; i++) {
      //     links[i].click();
      //   }
      // });

      cy.get('[data-test="nav-link"] > .link').first().click();
      testSearch("#search", "cou");

      cy.get('[data-test="nav-link"] > .link').last().click();
      testSearch("#search", "deh");
    });
  });
});
