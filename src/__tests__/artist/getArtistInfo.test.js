import config from "@/config";

import { flushPromises } from "@vue/test-utils";
import axios from "axios";

import { withSetup } from "@/__tests__/withSetup";
import {
  setup,
  artist,
  user,
  artworks,
  student,
  candidature,
  initValues,
  getArtist,
  getUser,
  getArtworks,
  getStudent,
  getCandidature,
} from "@/composables/artist/getArtistInfo";

/**

  fixtures

**/
import artistFixture from "~/fixtures/artist.json";
import userFixture from "~/fixtures/user.json";
import artworkFixture from "~/fixtures/artwork.json";
import studentFixture from "~/fixtures/student.json";
import promotionFixture from "~/fixtures/promotion.json";
import applicationFixture from "~/fixtures/studentApplication.json";

// function to mock a response to a promise response
// function createMockResolveValue(data) {
//   return {
//     json: () => new Promise((resolve) => resolve(data)),
//     ok: true,
//   };
// }

vi.mock("axios");

describe("test the composable getArtistInfo", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("Init values", () => {
    initValues();

    expect(artist.value).toEqual({});
    expect(artworks.value).toEqual([]);
    expect(student.value).toEqual({});
    expect(user.value).toEqual({});
    expect(candidature.value).toEqual({});
  });

  it("Get artist", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      // success once and fail once
      .mockResolvedValueOnce({ data: artistFixture })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Test with success
     */
    await getArtist(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(artist.value).toEqual(artistFixture);

    /**
     * Test with Fail
     */
    await getArtist(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(artist.value).toEqual({});
  });

  it("Get user", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      // success once and fail once
      .mockResolvedValueOnce({ data: userFixture.default })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Test with success
     */
    await getUser(userFixture.default.id);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(user.value).toEqual(userFixture.default);

    /**
     * Test with Fail
     */
    await getUser(userFixture.default.id);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(user.value).toEqual({});
  });

  it("Get artworks", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      // success once and fail once
      // the response of the request is always a array even if it's just one artwork
      .mockResolvedValueOnce({ data: artworkFixture })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Test with success
     */
    await getArtworks(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(artworks.value).toEqual(artworkFixture);

    // /**
    //  * Test with Fail
    //  */
    await getArtworks(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(artworks.value).toEqual([]);
  });

  it("Get student", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      // success once and fail once
      // the response of the request is always a array even if it's just one artwork
      .mockResolvedValueOnce({ data: studentFixture })
      .mockResolvedValueOnce({ data: promotionFixture })
      .mockRejectedValueOnce({ mockMessage: "Error" })
      .mockResolvedValueOnce({ data: studentFixture })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Test with success
     */
    await getStudent(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(2);

    const mockResult = studentFixture;
    mockResult[0].promotion = promotionFixture;

    expect(student.value).toEqual(mockResult);

    /**
     * Test with fail on first request
     */
    await getStudent(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(3);

    expect(student.value).toEqual({});

    /**
     * Test with fail on second request
     */
    await getStudent(artistFixture.id);

    expect(axios.get).toHaveBeenCalledTimes(5);

    expect(student.value).toEqual({});
  });

  it("Get candidature", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      // success once and fail once
      // the response of the request is always a array even if it's just one artwork
      .mockResolvedValueOnce({ data: [applicationFixture] })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Test with success
     */
    await getCandidature(userFixture.default.username);

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(candidature.value).toEqual(applicationFixture);

    /**
     * Test with fail
     */
    await getCandidature(userFixture.default.username);

    expect(axios.get).toHaveBeenCalledTimes(2);

    expect(candidature.value).toEqual({});
  });
});
