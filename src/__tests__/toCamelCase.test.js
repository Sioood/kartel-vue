import toCamelCase from "../composables/toCamelCase";

describe("Example for unit with composables", () => {
  it("Should results letters and numbers", () => {
    expect(toCamelCase("kebak_case_to_camel_case")).eq("kebakCaseToCamelCase");
  });
});
