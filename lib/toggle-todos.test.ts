import { describe, it, expect } from "vitest";
import { toggleTodos } from "./toggle-todos";
import type { Todo } from "@/lib/todo";

// テスト用のデータを「毎回新しく」作る関数
// テストどうしで同じ配列を使い回すと、1本目で書き換わった影響が2本目に残ることがあるため
const createTodos = (): Todo[] => [
  { id: 1, title: "読書", completed: false },
  { id: 2, title: "掃除", completed: true },
  { id: 3, title: "洗濯", completed: false },
];

describe("toggleTodos", () => {
  it("id 2 を渡すと、id 2 だけ completed が反転し、1 と 3 はそのまま", () => {
    // ① 準備
    const todos = createTodos();
    // ② 実行
    const result = toggleTodos(todos, 2);
    // ③ 確かめる（===== ここを自分で書く =====）
    //   result が「期待する3件の配列」と同じ中身か、toEqual で比べる

    expect(result).toEqual([
      { id: 1, title: "読書", completed: false },
      { id: 2, title: "掃除", completed: false },
      { id: 3, title: "洗濯", completed: false },
    ]);
  });

  // ===== 2本目：存在しない id（999）なら、元と同じ中身の配列が返る =====
  it("id 1を渡すとfalseからtrueになる", () => {
    // ① 準備
    const todos = createTodos();
    // ② 実行
    const result = toggleTodos(todos, 1);
    // ③ 確かめる（===== ここを自分で書く =====）
    //   result が「期待する3件の配列」と同じ中身か、toEqual で比べる

    expect(result).toEqual([
      { id: 1, title: "読書", completed: true },
      { id: 2, title: "掃除", completed: true },
      { id: 3, title: "洗濯", completed: false },
    ]);
  });
  // ===== 3本目：呼んだあとも、元の todos は書き換わっていない =====
  it("存在しない id(999)を渡すと、元と同じ中身の配列が返る", () => {
    // ① 準備
    const todos = createTodos();
    // ② 実行
    const result = toggleTodos(todos, 999);
    // ③ 確かめる（===== ここを自分で書く =====）
    //   result が「期待する3件の配列」と同じ中身か、toEqual で比べる

    expect(result).toEqual([
      { id: 1, title: "読書", completed: false },
      { id: 2, title: "掃除", completed: true },
      { id: 3, title: "洗濯", completed: false },
    ]);
  });

  it("読んだ後も、元のtodosは書き変わっていない", () => {
    const todos = createTodos();

    toggleTodos(todos, 2);

    expect(todos).toEqual([
      { id: 1, title: "読書", completed: false },
      { id: 2, title: "掃除", completed: true },
      { id: 3, title: "洗濯", completed: false },
    ]);
  });
});
