import { apiClient } from "@/lib/apiClient";
import fetchMock from "jest-fetch-mock";

describe("apiClient", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("成功時にデータをJSONとして返す", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Success" }));

    const result = await apiClient<{ message: string }>("/test");

    expect(result).toEqual({ message: "Success" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("エラー時にレスポンスのメッセージを投げる", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ errors: ["名前を入力してください"] }),
      { status: 400 },
    );

    await expect(apiClient("/test")).rejects.toThrow("名前を入力してください");
  });
});
