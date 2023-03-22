import config from "@/config";

import { flushPromises } from "@vue/test-utils";

import { withSetup } from "@/__tests__/withSetup";
import { getArtistInfo } from "@/composables/artist/getArtistInfo";

/**

  fixtures

**/
import artistFixture from "~/fixtures/artist.json";
import userFixture from "~/fixtures/user.json";
import artworkFixture from "~/fixtures/artwork.json";
import studentFixture from "~/fixtures/student.json";

// function to mock a response to a promise response
function createMockResolveValue(data) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}

describe("test the composable getArtistInfo", () => {
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
      createMockResolveValue({
        default: true,
      })
    )
    // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
    .mockReturnValueOnce(createMockResolveValue(artistFixture))
    .mockReturnValueOnce(createMockResolveValue(userFixture))
    .mockReturnValueOnce(createMockResolveValue(artworkFixture))
    .mockReturnValueOnce(createMockResolveValue(studentFixture))

  afterEach(() => {
    mockFetch.mockClear();
  });

  it("check every result", async () => {
    // console.log(artist);

    const [results, app] = withSetup(getArtistInfo, artistFixture.id);

    // leave the requests and replace with mocks
    await flushPromises();

    // check the mock has be use the right number of times (Correspond to the number of fetch inside getArtistInfo)
    expect(mockFetch).toHaveBeenCalledTimes(4);
    // and check if the last time is called it is with the right url. Supposed to be the student request
    expect(mockFetch).toHaveBeenLastCalledWith(
      `${config.rest_uri_v2}school/student?artist=${artistFixture.id}`
    );

    const { artist, user, artwork, student } = results;

    /**
    
      Check results
    
    **/

    // Artist result
    expect(artist.value)
      .toBeTypeOf("object")
      .toEqual(artistFixture)
      .haveOwnProperty("user");

    // User result
    expect(user.value)
      .toBeTypeOf("object")
      .toEqual(userFixture)
      .haveOwnProperty("username");

    // Artwork result
    expect(artwork.value).toBeTypeOf("object").toEqual(artworkFixture);

    expect(artwork.value[0]).haveOwnProperty("title");

    // Student result
    expect(student.value).toBeTypeOf("object").toEqual(studentFixture);

    expect(student.value[0]).haveOwnProperty("promotion");

    app.unmount();
  });

  it("catch on fetch fail", async () => {
    mockFetch
    // if once is present it would be the first mock and switch to the next mock or return to the default mock if no next
    .mockReturnValue(Promise.reject("Mock Catch API"));

    const [results, app] = withSetup(getArtistInfo, artistFixture.id);

    // leave the requests and replace with mocks
    await flushPromises();

    

    const { artist, user, artwork, student } = results;

    /**
    
      Check results
    
    **/

    // Artist result
    expect(artist.value)
      .toEqual({})

    // User result
    expect(user.value)
      .toEqual({})

    // Artwork result
    expect(artwork.value).toEqual({});


    // Student result
    expect(student.value).toEqual({});


    app.unmount();
  });
});
