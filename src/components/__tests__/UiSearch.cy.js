import UiSearch from "../ui/UiSearch.vue";

import "@/main";

import config from "@/config";

describe("Ui Search", () => {
  it("Check when results", () => {
    cy.intercept(`${config.rest_uri_v2}production/artwork-search*`).as(
      "artwork-search"
    );
    cy.intercept(`${config.rest_uri_v2}school/student-search*`).as(
      "student-search"
    );

    cy.mount(UiSearch);

    cy.get("#search").type("mer");
    cy.get("#search").should("have.value", "mer");

    // click to make input state focus
    cy.get("#search").click();
    cy.get("[data-test='results']").should("exist");

    cy.get(".p-2").should("not.have.class", "hidden");

    cy.wait("@artwork-search").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    cy.wait("@student-search").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    // click to make input state focus
    cy.get("#search").click();
    cy.get('[data-test="results"] > :nth-child(1)').should("exist");
    cy.get('[data-test="results"] > :nth-child(2)').should("exist");
    cy.get('[data-test="results"] > :nth-child(3)').should("exist");
  });

  it("Check when no results", () => {
    cy.intercept(`${config.rest_uri_v2}production/artwork-search*`).as(
      "artwork-search"
    );
    cy.intercept(`${config.rest_uri_v2}school/student-search*`).as(
      "student-search"
    );

    cy.mount(UiSearch);

    cy.get("#search").type("cypress again");

    // click to make input state focus
    cy.get("#search").click();
    cy.get("[data-test='results']").should("have.class", "hidden");

    cy.wait("@artwork-search").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    cy.wait("@student-search").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    // click to make input state focus
    cy.get("#search").click();
    cy.get(".p-2")
      .should("not.have.class", "hidden")
      .and("have.class", "block");
    // cy.get('[data-test="results"] > :nth-child(1)').should("not.exist");
    // cy.get('[data-test="results"] > :nth-child(2)').should("not.exist");
    // cy.get('[data-test="results"] > :nth-child(3)').should("not.exist");
  });

  it("Check when input have nothing or only space after trim", () => {
    cy.mount(UiSearch);

    // check before typing something
    cy.get(".absolute").and("have.class", "hidden");

    cy.get("#search").type("    ");

    // click to make input state focus
    cy.get("#search").click();

    // check after typing something
    cy.get(".absolute").and("have.class", "hidden");

    cy.get("#search").type("          mer");
    cy.get(".absolute").and("not.have.class", "hidden");
  });
});
