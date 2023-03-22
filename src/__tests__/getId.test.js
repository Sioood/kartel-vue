import { getId } from "@/composables/getId";

describe("test the composable getId", () => {
  it("verify branch", () => {
    expect(getId("http://127.0.0.1:8000/v2/people/user/670")).toEqual(670);
    expect(getId()).toEqual(null);
  });
});
