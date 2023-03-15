import { flushPromises } from "@vue/test-utils";

import { withSetup } from "@/__tests__/withSetup";
import { getArtistInfo } from "@/composables/artist/getArtistInfo";

function createMockResolveValue(data) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}

describe("", () => {
  const mockFetch = vi.spyOn(global, "fetch");

  // need to deal with multiple request
  // mockReturnValueOnce return value once with that we can control with the timelime of request inside the composables
  // but the problem is once concern a function and is nested function

  // Like this
  // function one() {
  //   response === firstMock;
  //   function two() {
  //     response === firstMock;
  //   }
  // }
  //
  // function three() {
  //   response === secondMock;
  // }

  mockFetch
    .mockReturnValue(
      // default mock but not the first
      createMockResolveValue({})
    )
    // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
    .mockReturnValueOnce(
      createMockResolveValue({
        id: 1,
        user: "http://127.0.0.1:8000/v2/people/user/670",
      })
    );

  afterEach(() => {
    mockFetch.mockClear();
  });

  it("", async () => {
    // console.log(artist);

    const [results, app] = withSetup(getArtistInfo, 1);

    await flushPromises();

    const { artist, user, artwork } = results;

    console.log("artist ref", artist);

    // expect(results).haveOwnProperty("artist");

    // console.log(app);

    // Assert results
    console.log("results :", results);

    app.unmount();
  });
});
