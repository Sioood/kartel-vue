import UiLink from "../ui/UiLink.vue";

describe("Ui Link", () => {
  it("Check props", () => {
    let data = { url: "/", text: "Hello Cypress" };
    cy.mount(UiLink, { props: { url: data.url, text: data.text } });

    cy.get(".link")
      .should("exist")
      .contains(data.text)
      .should("have.attr", "to")
      .and("include", data.url);

    data.url = "/school";
    data.text = "Hello again Cypress";

    cy.mount(UiLink, { props: { url: data.url, text: data.text } });

    cy.get(".link")
      .should("exist")
      .contains(data.text)
      .should("have.attr", "to")
      .and("include", data.url);
  });
});
