import AppButton from "../ui/AppButton.vue";

describe("Artwork card", () => {
  it("Check props", () => {
    let data = {
      text: "Hello Cypress",
    };
    cy.mount(AppButton, {
      props: { text: data.text },
    });

    cy.get("button").should("exist").contains(data.text);
  });
});
