// /api/todos/[id]：1件のTODOを操作するAPI
// [id] のフォルダ名が「URLの中の変わる部分」になる
//   例）PATCH /api/todos/2 → id は "2"（文字列）

import { todos } from "@/lib/todo-store";

// PATCH /api/todos/[id]：完了・未完了を切り替える
export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ① URLの中の id。Next.js 16 では Promise
) => {
  const { id } = await params; // ② 届くのを待って取り出す（"2" などの文字列）
  const todo = todos.find((todo) => todo.id === Number(id)); // ③ 数字にして比べ、1件探す

  if (!todo) {
    // ④ 見つからない（undefined）なら 404 で早期リターン
    return Response.json({ error: "見つかりません" }, { status: 404 });
  }

  todo.completed = !todo.completed; // ⑤ true ↔ false を反対にする
  return Response.json(todo);
};

// DELETE /api/todos/[id]：1件削除する
export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const index = todos.findIndex((todo) => todo.id === Number(id)); // ⑥ 何番目か。ないと -1

  if (index === -1) {
    return Response.json({ error: "見つかりません" }, { status: 404 });
  }

  if (todos[index].completed) {
    return Response.json({ error: "完了済みは削除できません" }, { status: 400 });
  }

  todos.splice(index, 1); // ⑦ その番号から1件を取り除く
  return Response.json({ ok: true });
};

