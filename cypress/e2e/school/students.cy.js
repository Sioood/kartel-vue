import config from "../../../src/config";

describe("Students", () => {
  it("intercept request of students", () => {
    //get url path by config !!!

    // intercept any request of /v2/school/promotion
    cy.intercept(`${config.rest_uri_v2}school/student*`).as("students");
    cy.intercept(`${config.rest_uri_v2}people/user/*`).as("studentUser");

    cy.visit("/school");

    cy.get(".promo__link").last().click();

    cy.wait("@students").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    cy.wait("@studentUser").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    // check if body exist and if each element of it contains rights properties
  });
});
