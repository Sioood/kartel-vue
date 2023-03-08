import config from "../../../src/config";

describe("Artist and artworks informations from school, navigate through all pages like branch", () => {
  context("Check navigation Home to School", () => {
    it("Home logo redirect should be '/'", () => {
      cy.viewport(1280, 720);
      cy.visit("/");
      cy.get('[data-test="toggle-theme"]').click();

      cy.get("[data-test='logo-lg']").click();
      cy.location().should((loc) => {
        expect(loc.href).to.eq(config.api_url);
        expect(loc.pathname).to.eq("/");
      });
    });

    it("Navigation bar to School with link", () => {
      cy.viewport(1280, 720);
      cy.visit("/");
      cy.get('[data-test="toggle-theme"]').click();

      cy.get("[data-test='nav-link']").contains("School").click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/school/promotion/4");
      });
    });
  });

  context("Check navigation School to an artist profile", () => {
    it("Get data of differents promotions", () => {
      cy.viewport(1280, 720);

      cy.intercept(`${config.rest_uri_v2}school/promotion`).as("promotions");
      cy.intercept(`${config.rest_uri_v2}school/promotion/*`).as("promotion");

      cy.visit("/school");
      cy.get('[data-test="toggle-theme"]').click();

      cy.wait("@promotions").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;

        // check each properties expected
        // FOR ME important because if the structure of the DB will be modified,
        // the informations requested will not be the same -> EX: starting_year or started_year
        response.body.forEach((el) => {
          expect(el).to.have.property("url");
          expect(el).to.have.property("name");
          expect(el).to.have.property("starting_year");
          expect(el).to.have.property("ending_year");
        });
      });

      cy.get(":nth-child(5) > .promo__link").click();

      cy.wait("@promotion").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;
      });
    });

    it("Get a student from a promotion", () => {
      cy.viewport(1280, 720);
      cy.visit("/school");
      cy.get('[data-test="toggle-theme"]').click();

      cy.get(":nth-child(8) > .promo__link").click();

      cy.get('[data-key="0"] > .relative').click();

      cy.location().should((loc) => {
        expect(loc.pathname).to.match(/artist/);
      });
    });
  });

  context("Artist profile to artwork", () => {
    it("Check data of artist page 1606", () => {
      cy.viewport(1280, 720);

      cy.visit("/artist/1606");
      cy.get('[data-test="toggle-theme"]').click();

      cy.get("h2").contains("Amélie Agbo");
      cy.get("h2").contains("Oeuvres");
    });

    it("Check data of an artwork of the precedent artist", () => {
      cy.viewport(1280, 720);

      cy.visit("/artwork/1278");
      cy.get('[data-test="toggle-theme"]').click();

      cy.get("h1").contains("Bénincity : épisode 4");

      // return to check artist
      cy.get("a").contains("Amélie Agbo").click();
      cy.get("h2").contains("Amélie Agbo");
    });
  });
});
