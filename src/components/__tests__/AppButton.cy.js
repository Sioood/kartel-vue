import AppButton from "../ui/AppButton.vue";

describe("Artwork card", () => {
  it("Check props", () => {
    let data = {
      text: "Hello Cypress",
    };
    cy.mount(AppButton, {
      slots: {
        default: () => data.text,
      },
    });

    cy.get("button").should("exist").contains(data.text);
  });
});
