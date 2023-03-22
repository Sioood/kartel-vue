import config from "@/config";

import { flushPromises } from "@vue/test-utils";

import { getContent, content, offset, load } from "@/composables/getContent";

import artworkFixture from "~/fixtures/artwork.json";
import artistFixture from "~/fixtures/artist.json";

// function to mock a response to a promise response
function createMockResolveValue(data) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}

let params = {
  genres: null,
  keywords: null,
  productionYear: null,
  q: null,
  shootingPlace: null,
  type: null,
};

describe("test the composable getContent", () => {
  const mockFetch = vi.spyOn(global, "fetch");

  mockFetch.mockReturnValue(
    // default mock but not the first
    createMockResolveValue({
      default: true,
    })
  );

  afterEach(() => {
    mockFetch.mockClear();

    // reset default value
    content.value = [];
    offset.value = 1;
    load.value = false;
  });

  it("check content for artwork", async () => {
    mockFetch
      // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
      .mockReturnValueOnce(createMockResolveValue(artworkFixture))
      .mockReturnValueOnce(createMockResolveValue([artistFixture]));

    // check default value
    expect(content.value).toEqual([]);
    expect(load.value).toEqual(false);
    expect(offset.value).toEqual(1);

    // console.log(artist);
    await getContent("artwork", params);

    // leave the requests and replace with mocks
    await flushPromises();

    // check value after running once getContent
    expect(content.value).toEqual(artworkFixture);
    expect(load.value).toEqual(true);
    expect(offset.value).toEqual(2);
  });

  it("check content for artist", async () => {
    // check default value
    expect(content.value).toEqual([]);
    expect(load.value).toEqual(false);
    expect(offset.value).toEqual(1);

    await getContent("artist", params);

    // leave the requests and replace with mocks
    await flushPromises();

    // check value after running once getContent
    expect(content.value).toEqual([artistFixture]);
    expect(load.value).toEqual(true);
    expect(offset.value).toEqual(2);
  });

  it("catch on fetch fail", async () => {
    mockFetch
      // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
      .mockReturnValueOnce(Promise.reject("Mock Catch API"));

    await getContent("artist", params);

    // leave the requests and replace with mocks
    await flushPromises();

    // check value after running once getContent
    expect(content.value).toEqual([]);
    expect(load.value).toEqual(true);
    expect(offset.value).toEqual(1);
  });
});
