import axios from "axios";

import { useRouter } from "vue-router";

import {
  message,
  user,
  login,
  logout,
  fromStorageToRef,
} from "@/composables/auth/auth";

// instance doesn't work with mock ?! axios.create results undefined
// https://runthatline.com/how-to-mock-axios-with-vitest/
vi.mock("axios");

vi.mock("vue-router");

describe("test the composable getContent", () => {
  beforeEach(() => {
    // axios.get.mockReset();

    vi.clearAllMocks();
  });

  const setItem = vi.spyOn(Storage.prototype, "setItem");
  const getItem = vi.spyOn(Storage.prototype, "getItem");
  const removeItem = vi.spyOn(Storage.prototype, "removeItem");

  useRouter.mockReturnValue({
    push: vi.fn(),
    go: vi.fn(),
  });

  const router = useRouter();

  it("login", async () => {
    const dataMock = {
      token: "token",
      user: {
        pk: 1,
        username: "username",
        email: "username@kartel.vue",
        first_name: "first",
        last_name: "last",
      },
    };

    /**
     * With success
     */
    axios.post.mockResolvedValue({
      status: 200,
      data: dataMock,
    });

    await login("username", "password", router);

    expect(setItem).toHaveBeenCalledTimes(2);

    expect(user.value.user).toEqual(dataMock.user);
    expect(user.value.token).toEqual(dataMock.token);

    /**
     * With fail
     */
    const mockReject = {
      data: dataMock,
      response: {
        status: 400,
        data: {
          non_field_errors: ["Invalid username or password."],
        },
      },
    };

    axios.post.mockRejectedValue(mockReject);

    // reset value
    user.value.user = "";
    user.value.token = "";

    expect(message.value.status).toEqual("normal");

    await login("username", "password", router);

    expect(setItem).toHaveBeenCalledTimes(2);

    expect(user.value.user).toEqual("");
    expect(user.value.token).toEqual("");
    expect(message.value.data).toEqual(
      mockReject.response.data.non_field_errors[0]
    );
    expect(message.value.status).toEqual("error");
  });

  it("logout", () => {
    logout(router);

    expect(removeItem).toHaveBeenCalledTimes(2);

    // can spy fromStorageToRef to check if it was called ??

    expect(user.value.user).toEqual("");
    expect(user.value.token).toEqual("");

    expect(useRouter().go).toHaveBeenCalledTimes(1);
    expect(useRouter().go).toHaveBeenCalledWith(0);
  });

  it("test comportment of fromStorageToRef", () => {
    /**
     * With local storage
     */
    getItem
      .mockReturnValueOnce(JSON.stringify("user"))
      .mockReturnValueOnce("token");

    fromStorageToRef();

    expect(getItem).toHaveBeenCalledTimes(2);

    expect(user.value.user).toEqual("user");
    expect(user.value.token).toEqual("token");

    /**
     * Without
     */
    fromStorageToRef();
    expect(getItem).toHaveBeenCalledTimes(4);

    expect(user.value.user).toEqual("");
    expect(user.value.token).toEqual("");
  });
});
