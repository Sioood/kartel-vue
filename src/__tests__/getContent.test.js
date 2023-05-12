import { flushPromises } from "@vue/test-utils";

import axios from "axios";

import {
  getContent,
  content,
  offset,
  load,
  params,
} from "@/composables/getContent";

import artworkFixture from "~/fixtures/artwork.json";
import artistFixture from "~/fixtures/artist.json";

// function to mock a response to a promise response
// function createMockResolveValue(data) {
//   return {
//     json: () => new Promise((resolve) => resolve(data)),
//     ok: true,
//   };
// }

let artworksParams = {
  genres: null,
  keywords: null,
  productionYear: null,
  q: null,
  shootingPlace: null,
  type: "film",
};

let artistsParams = {
  nationality: "FR",
  q: null,
};

// instance doesn't work with mock ?! axios.create results undefined
// https://runthatline.com/how-to-mock-axios-with-vitest/
vi.mock("axios");

// mockAxios.create = vi.fn(() => mockAxios)

describe("test the composable getContent", () => {
  beforeEach(() => {
    axios.get.mockReset();

    content.value = [];
    offset.value = 1;
    load.value = false;
  });

  // const mockFetch = vi.spyOn(global, "instance");

  // mockFetch.mockReturnValue(
  //   // default mock but not the first
  //   createMockResolveValue({
  //     default: true,
  //   })
  // );

  it("check content for artwork", async () => {
    // mockFetch
    //   // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
    //   .mockReturnValueOnce(createMockResolveValue(artworkFixture))
    //   .mockReturnValueOnce(createMockResolveValue([artistFixture]));

    axios.get.mockResolvedValue({
      data: artworkFixture,
    });

    // check default value
    expect(content.value).toEqual([]);
    expect(load.value).toEqual(false);
    expect(offset.value).toEqual(1);

    // console.log(artist);
    await getContent("artworks", artworksParams);

    // leave the requests and replace with mocks
    // await flushPromises();

    // check value after running once getContent
    expect(content.value).toEqual(artworkFixture);
    expect(load.value).toEqual(true);
    expect(offset.value).toEqual(2);

    // expect(params).haveOwnProperty("genres");
    expect(params).haveOwnProperty("keywords");
    expect(params).haveOwnProperty("productionYear");
    expect(params).haveOwnProperty("query");
    // expect(params).haveOwnProperty("shootingPlace", null);
    expect(params).haveOwnProperty("type", `type=${artworksParams.type}`);
  });

  it("check content for artist", async () => {
    axios.get.mockResolvedValue({
      data: [artistFixture],
    });
    // check default value
    expect(content.value).toEqual([]);
    expect(load.value).toEqual(false);
    expect(offset.value).toEqual(1);

    await getContent("artists", artistsParams);
    // leave the requests and replace with mocks
    // await flushPromises();
    // check value after running once getContent

    expect(content.value).toEqual([artistFixture]);
    expect(load.value).toEqual(true);
    // expect(offset.value).toEqual(2);
    expect(params).haveOwnProperty(
      "nationality",
      `nationality=${artistsParams.nationality}`
    );
    expect(params).haveOwnProperty("query", null);
  });

  it("catch on fetch fail", async () => {
    // mockFetch
    //   // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
    //   .mockReturnValueOnce(Promise.reject("Mock Catch API"));
    axios.get
      .mockRejectedValueOnce({
        response: {
          status: 403,
        },
      })
      .mockRejectedValueOnce({
        response: {
          status: 404,
        },
      });

    // check value after running once getContent with 403 error
    await getContent("artists", artistsParams);

    expect(content.value).toEqual([]);
    expect(load.value).toEqual(false);
    expect(offset.value).toEqual(1);

    // check value after running once getContent with 404 error
    await getContent("artists", artistsParams);

    expect(content.value).toEqual([]);
    expect(load.value).toEqual(false);
    expect(offset.value).toEqual(1);
  });
});
