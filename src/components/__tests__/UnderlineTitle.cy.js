import UnderlineTitle from "../ui/UnderlineTitle.vue";

describe("Underline title check props for every size", () => {
  it("h1", () => {
    // Title size h1
    let data = {
      title: "Hello Cypress",
      underlineSize: 1,
      fontSize: 1,
    };

    cy.mount(UnderlineTitle, {
      props: {
        title: data.title,
        underlineSize: data.underlizeSize,
        fontSize: data.fontSize,
      },
    });

    cy.get("h1").should("exist").contains(data.title);
    cy.get("h2").should("not.exist");
    cy.get("h3").should("not.exist");
    cy.get("h4").should("not.exist");
    cy.get("h5").should("not.exist");
    cy.get("h6").should("not.exist");
  });

  it("h2", () => {
    // Title size h1
    let data = {
      title: "Hello Again Cypress",
      underlineSize: 2,
      fontSize: 2,
    };

    cy.mount(UnderlineTitle, {
      props: {
        title: data.title,
        underlineSize: data.underlizeSize,
        fontSize: data.fontSize,
      },
    });

    cy.get("h1").should("not.exist");
    cy.get("h2").should("exist").contains(data.title);
    cy.get("h3").should("not.exist");
    cy.get("h4").should("not.exist");
    cy.get("h5").should("not.exist");
    cy.get("h6").should("not.exist");
  });

  it("h3", () => {
    // Title size h1
    let data = {
      title: "Hello Again for the second time Cypress",
      underlineSize: 2,
      fontSize: 3,
    };

    cy.mount(UnderlineTitle, {
      props: {
        title: data.title,
        underlineSize: data.underlizeSize,
        fontSize: data.fontSize,
      },
    });

    cy.get("h1").should("not.exist");
    cy.get("h2").should("not.exist");
    cy.get("h3").should("exist").contains(data.title);
    cy.get("h4").should("not.exist");
    cy.get("h5").should("not.exist");
    cy.get("h6").should("not.exist");
  });

  it("h4", () => {
    // Title size h1
    let data = {
      title: "Hello again again and again Cypress",
      underlineSize: 2,
      fontSize: 4,
    };

    cy.mount(UnderlineTitle, {
      props: {
        title: data.title,
        underlineSize: data.underlizeSize,
        fontSize: data.fontSize,
      },
    });

    cy.get("h1").should("not.exist");
    cy.get("h2").should("not.exist");
    cy.get("h3").should("not.exist");
    cy.get("h4").should("exist").contains(data.title);
    cy.get("h5").should("not.exist");
    cy.get("h6").should("not.exist");
  });

  it("h5", () => {
    // Title size h1
    let data = {
      title: "Cypress not the last but almost the end",
      underlineSize: 2,
      fontSize: 5,
    };

    cy.mount(UnderlineTitle, {
      props: {
        title: data.title,
        underlineSize: data.underlizeSize,
        fontSize: data.fontSize,
      },
    });

    cy.get("h1").should("not.exist");
    cy.get("h2").should("not.exist");
    cy.get("h3").should("not.exist");
    cy.get("h4").should("not.exist");
    cy.get("h5").should("exist").contains(data.title);
    cy.get("h6").should("not.exist");
  });

  it("h6", () => {
    // Title size h1
    let data = {
      title: "Cypress for the last one",
      underlineSize: 2,
      fontSize: 6,
    };

    cy.mount(UnderlineTitle, {
      props: {
        title: data.title,
        underlineSize: data.underlizeSize,
        fontSize: data.fontSize,
      },
    });

    cy.get("h1").should("not.exist");
    cy.get("h2").should("not.exist");
    cy.get("h3").should("not.exist");
    cy.get("h4").should("not.exist");
    cy.get("h5").should("not.exist");
    cy.get("h6").should("exist").contains(data.title);
  });
});
