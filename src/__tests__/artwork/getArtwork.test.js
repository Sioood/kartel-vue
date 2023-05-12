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
  getGenres,
  getGenre,
  getDiffusions,
  getDiffusion,
  getEvent,
  Media,
} from "@/composables/artwork/getArtwork";

/**

  fixtures

**/
import artistFixture from "~/fixtures/artist.json";
import userFixture from "~/fixtures/user.json";
import artworkFixture from "~/fixtures/artwork.json";
import galleryFixture from "~/fixtures/gallery.json";
import genreFixture from "~/fixtures/genre.json";
import diffusionFixture from "~/fixtures/diffusion.json";
import eventFixture from "~/fixtures/event.json";

import { getId } from "@/composables/getId.js";

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

  it("Get artwork work like setup", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: artworkFixture[0] })
      .mockResolvedValueOnce({ data: artistFixture })
      .mockResolvedValue({ data: galleryFixture });

    const artistId = getId(artworkFixture[0].url);
    await getArtwork(artistId);

    console.log(axios.get);

    /**
     * Count from artworkFixture
     * artwork : 1
     * authors : 1
     * gallery : 3
     */
    expect(axios.get).toHaveBeenCalledTimes(5);
    expect(artwork.value).toEqual(artworkFixture[0]);

    // check if each url is called correctly
    expect(axios.get).toHaveBeenCalledWith(`production/artwork/${artistId}`);
    artworkFixture[0].authors.forEach((author) => {
      expect(axios.get).toHaveBeenCalledWith(author);
    });

    let galleriesKeys = [];

    Object.keys(artworkFixture[0]).forEach((key) => {
      if (key.includes("galleries")) galleriesKeys.push(key);
    });

    // check dynamilly if each gallery is called
    for (let gallery of galleriesKeys) {
      if (artworkFixture[0][gallery] && artworkFixture[0][gallery].length > 0) {
        artworkFixture[0][gallery].forEach((url) => {
          expect(axios.get).toHaveBeenCalledWith(url);
        });
      }
    }

    // We check if each url is called correctly, we don't check the data
    // the rest is not async... we check the function specificly after
  });

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
  // it("New Media", async () => {
  //   axios.get
  //     .mockResolvedValue(
  //       // default mock but not the first
  //       {
  //         data: {
  //           default: true,
  //         },
  //       }
  //     )
  //     .mockResolvedValueOnce({ data: galleryFixture })
  //     .mockResolvedValueOnce({ data: galleryFixture })
  //     .mockRejectedValue({ mockMessage: "Error" });

  //   let mockGalleryData = galleryFixture;

  //   const media = new Media(
  //     galleryFixture.media[0],
  //     mockGalleryData,
  //     galleries.value["inSituGalleries"]
  //   );

  //   await media._fetchMedia(
  //     galleryFixture.media[0],
  //     mockGalleryData,
  //     galleries.value["inSituGalleries"]
  //   );
  //   // console.log(media);

  //   // console.log(galleries.value);
  //   console.log(galleries.value["inSituGalleries"]);

  //   expect(galleries.value["inSituGalleries"].mediaData).toEqual(mediaFixture);
  // });

  it("Get genres", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: genreFixture })
      .mockRejectedValue({ mockMessage: "Error" });

    /**
     * Success
     */
    getGenres([genreFixture.url]);

    expect(axios.get).toHaveBeenCalledTimes(1);

    await getGenre(genreFixture.url);
    expect(genres.value).toEqual([genreFixture]);

    /**
     * Fail
     */
    initValues();
    await getGenre(genreFixture.url);

    expect(genres.value).toEqual([]);
  });

  it("Get diffusion events", async () => {
    axios.get
      .mockResolvedValue(
        // default mock but not the first
        {
          data: {
            default: true,
          },
        }
      )
      .mockResolvedValueOnce({ data: diffusionFixture })
      .mockResolvedValueOnce({ data: eventFixture })
      .mockRejectedValueOnce({ mockMessage: "Error" })
      .mockResolvedValueOnce({ data: diffusionFixture })
      .mockRejectedValueOnce({ mockMessage: "Error" });

    /**
     * Success
     */
    await getDiffusion(diffusionFixture.url);
    expect(axios.get).toHaveBeenCalledTimes(2);

    expect(events.value).toEqual([eventFixture]);

    /**
     * Fail
     */
    initValues();
    await getDiffusion(diffusionFixture.url);
    expect(axios.get).toHaveBeenCalledTimes(3);

    expect(events.value).toEqual([]);

    await getDiffusion(diffusionFixture.url);

    expect(axios.get).toHaveBeenCalledTimes(5);
    expect(events.value).toEqual([]);
  });
});
