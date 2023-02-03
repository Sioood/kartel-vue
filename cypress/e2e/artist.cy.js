describe("Artist view", () => {
  it("intercept request of artist", () => {
    //get url path by config !!!

    // intercept any request of /v2/school/promotion
    cy.intercept("https://api.lefresnoy.net/v2/people/artist/*").as("artist");
    cy.intercept("https://api.lefresnoy.net/v2/people/user/*").as("user");
    cy.intercept("https://api.lefresnoy.net/v2/school/student/*").as("student");

    cy.visit("/school");

    cy.get(".promo__link").last().click();
    cy.get(".artist__card").first().click();

    cy.wait("@artist").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    cy.wait("@user").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    cy.wait("@student").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.exist;
    });

    // check if body exist and if each element of it contains rights properties
  });
});
