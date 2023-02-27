import config from "../../../src/config";

describe("Promotions", () => {
  it("intercept request of promotions", () => {
    //get url path by config !!!

    // intercept any request of /v2/school/promotion
    cy.intercept(`${config.rest_uri_v2}school/promotion*`).as("promotion");
    cy.visit("/school");

    // check if body exist and if each element of it contains rights properties
    cy.wait("@promotion").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;

      // check each properties expected - Maybe not mandatory
      response.body.forEach((el) => {
        expect(el).to.have.property("url");
        expect(el).to.have.property("name");
        expect(el).to.have.property("starting_year");
        expect(el).to.have.property("ending_year");
      });
    });
  });
});
