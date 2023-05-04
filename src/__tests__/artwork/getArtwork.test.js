import axios from "axios";

import {
  getArtwork,
  artwork,
  authorsStore,
  galleries,
  genres,
  events,
  initValues,
  getAuthors,
  getUsername,
  getGalleries,
  Media,
} from "@/composables/artwork/getArtwork";

/**

  fixtures

**/
import artistFixture from "~/fixtures/artist.json";
import userFixture from "~/fixtures/user.json";
import artworkFixture from "~/fixtures/artwork.json";
import galleryFixture from "~/fixtures/gallery.json";
import mediaFixture from "~/fixtures/media.json";
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

    expect(artwork.value).toEqual({});
    expect(authorsStore.value).toEqual({});
    expect(galleries.value).toEqual({});
    expect(genres.value).toEqual([]);
    expect(events.value).toEqual([]);
    // media index Map ?
  });

  // it("Get artwork work like setup", async () => {
  //   axios.get
  //     .mockResolvedValue(
  //       // default mock but not the first
  //       {
  //         data: {
  //           default: true,
  //         },
  //       }
  //     )
  //     .mockResolvedValueOnce({ data: artworkFixture[0] })
  //     .mockResolvedValueOnce({ data: artistFixture })
  //     .mockResolvedValueOnce({ data: galleryFixture });

  //   await getArtwork(artworkFixture.id);

  //   /**
  //    * Count from artworkFixture
  //    * artwork : 1
  //    * authors : 1
  //    * gallery : 3
  //    * diffusion : 1
  //    */
  //   expect(axios.get).toHaveBeenCalledTimes(6);
  //   expect(artwork.value).toEqual(artworkFixture[0]);
  // });

  it("Get authors", async () => {
    // remove nickname of artist to generate username from getUsername
    const mockArtist = artistFixture;
    mockArtist.nickname = "";

    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: mockArtist })
      .mockResolvedValueOnce({ data: userFixture.default })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Success
     */
    // authors with no nickname call user to get first name and lastname instead of nickname
    await getAuthors(artworkFixture[0].authors);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get.calls[0][0]).toEqual(artworkFixture[0].authors[0]);
    expect(axios.get.calls[1][0]).toEqual(artistFixture.user);

    expect(authorsStore.value).toEqual([artistFixture]);

    const mockUsername = `${userFixture.default.first_name} ${userFixture.default.last_name}`;
    expect(authorsStore.value[0].username).toEqual(mockUsername);

    /**
     * Fail
     */
    await getAuthors(artworkFixture[0].authors);
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(authorsStore.value[0]).toEqual({});
  });

  it("Get username", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: userFixture.default })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Success
     */
    // authors with no nickname call user to get first name and lastname instead of nickname
    expect(await getUsername(artistFixture.user)).toEqual(
      `${userFixture.default.first_name} ${userFixture.default.last_name}`
    );
    expect(axios.get).toHaveBeenCalledTimes(1);

    /**
     * Fail
     */
    expect(await getUsername(artistFixture.user)).toEqual(undefined);
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  it("Get galleries", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: galleryFixture })
      .mockRejectedValue({ mockMessage: "Error" });

    getGalleries(artworkFixture[0]);

    // Number of not empty galleries in artworkFixture
    expect(axios.get).toHaveBeenCalledTimes(3);
  });

  // following of getGallery
  it("New Media", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: galleryFixture })
      .mockResolvedValueOnce({ data: galleryFixture })
      .mockRejectedValue({ mockMessage: "Error" });

    let mockGalleryData = galleryFixture;

    const media = new Media(galleryFixture.media[0], mockGalleryData, galleries.value["inSituGalleries"]);
    // await media._fetchMedia();
    console.log(media);

    console.log(galleries.value);
  });
});
