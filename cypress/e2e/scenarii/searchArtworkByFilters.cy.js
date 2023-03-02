import config from "../../../src/config";

describe("Search artworks or an artwork in the artworks page and it's filters", () => {
  context("Check the infinite scrolling", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      // let page = 1;
      cy.intercept(`${config.rest_uri_v2}/production/artwork?*`).as("page");
      cy.intercept(
        `${config.rest_uri_v2}/production/artwork?production_year=*`
      ).as("year");

      // cy.intercept(`${config.rest_uri_v2}/production/artwork?*`, (req) => {
      //   // do it for each intercepted xrequest
      //   req.continue((response) => {
      //     expect(response.statusCode).to.eq(200);
      //     expect(response.body).to.exist;

      //     // check index of the page for the scroll based on the offset page which increment each time a request @page occur
      //     expect(response.url).to.include(`page=${page}`);
      //     page++;

      //     window.cy.scrollTo("bottom");
      //   });
      // });

      cy.visit("/artworks");
      cy.get('[data-test="toggle-theme"]').click();
    });

    it("Home logo redirect should be '/'", () => {
      let page = 1;

      cy.wait("@page").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;
        // check index of the page for the scroll based on the offset page which increment each time a request @page occur
        expect(response.url).to.include(`page=${page}`);
        page++;
        cy.scrollTo("bottom");
      });

      // wait a second time for check
      cy.wait("@page").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;
        // check index of the page for the scroll based on the offset page which increment each time a request @page occur
        expect(response.url).to.include(`page=${page}`);
        page++;
        cy.scrollTo("bottom");
      });

      cy.get("#date").select(5);

      cy.wait("@year").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;

        expect(response.url).to.include("production_year=");
      });
    });
  });

  context("Check if the results have the right production date", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.intercept(
        `${config.rest_uri_v2}/production/artwork?production_year*`
      ).as("page");

      cy.visit("/artworks");
      cy.get('[data-test="toggle-theme"]').click();
    });

    it("", () => {
      cy.get("#date").select(3);

      // check for third option
      cy.wait("@page").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;

        // 2019 is the third option in select production date.
        expect(response.url).to.include("production_year=2021");
      });

      cy.get("#date").select(5);

      // check for fifth option
      cy.wait("@page").then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body).to.exist;

        // 2019 is the fifth option in select production date.
        expect(response.url).to.include("production_year=2019");
      });

      cy.get(
        ":nth-child(1) > .flex > .bg-gray-extralightest > .w-full"
      ).click();

      // match every time the url change for checking if we stay in the artwork tree
      cy.on("url:changed", (url) => {
        // regex can be more precise to match only artwork with /:id
        // Need to find a way to integrate
        expect(url).to.match(/artwork/);
      });

      cy.get(".py-5 > :nth-child(1) > .flex-wrap").contains("2019");
    });
  });
});
