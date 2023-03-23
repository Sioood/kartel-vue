import UiDescription from "../ui/UiDescription.vue";

describe("Ui Description", () => {
  it("Check props and reactivity to them", () => {
    let data = { desc_fr: "fr", desc_en: "en" };
    cy.mount(UiDescription, {
      props: { desc_fr: data.desc_fr, desc_en: data.desc_en },
    });

    // check state with both desc filled
    cy.get(".p-4 > .text-xs").contains(data.desc_fr);

    cy.get(".underline").contains("FR");
    cy.get(".underline").click().contains("FR");

    cy.get(".justify-between > .flex > :nth-child(2)").click();

    cy.get(".p-4 > .text-xs").contains(data.desc_en);

    cy.get(".underline").contains("EN");

    // check state if FR which it's the first one to be displayed is empty
    data.desc_fr = "";
    data.desc_en = "I'm the only one to have data";

    cy.mount(UiDescription, {
      props: { desc_fr: data.desc_fr, desc_en: data.desc_en },
    });

    cy.get(".p-4 > .text-xs").contains(data.desc_en);

    cy.get(".underline").contains("EN");
  });
});
