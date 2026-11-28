import { describe, it, expect } from "vitest";
import { PATCH } from "./route";

// describe：テストのまとまり（何をテストするか）
describe("PATCH /api/todos/[id]", () => {
  // it：テスト1本（どうなるはずか）
  it("存在しないIDなら404を返す", async () => {
    // ① 準備：本番では Next.js が渡してくる request と params を、自分で作る
    const request = new Request("http://localhost/api/todos/999", {
      method: "PATCH",
    });
    const params = Promise.resolve({ id: "999" });

    // ② 実行：route.ts の PATCH を、ふつうの関数として直接呼ぶ
    const res = await PATCH(request, { params });

    // ③ 確かめる（===== ここを自分で書く =====）
    //   - res.status が 404 であること
    //   - await res.json() の中身が { error: "見つかりません" } であること

    expect(res.status).toBe(404);

    expect(await res.json()).toEqual({ error: "見つかりません" });
  });
});
