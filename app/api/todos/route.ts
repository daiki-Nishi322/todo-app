// GET /api/todos：TODOの一覧を返すAPI
// ステップ8でデータベースに置き換えるまで、データはこの配列に入れておく

import type { Todo } from "@/lib/todo";
import { todos } from "@/lib/todo-store";

// ① TODOの配列は lib/todo-store.ts に移した（[id]/route.ts からも使うため）

// ② GET を export する（async のアロー関数）。中で ① の配列を Response.json で返す

export const GET = async () => {
  return Response.json(todos);
};

// ===== ステップ5 =====
// ③ POST を export する（async のアロー関数。引数は request: Request）
//    1. request.json() から title を取り出す（分割代入。RAGボットの { messages } と同じ）
//    2. 新しい Todo を作る（id は Date.now()、completed は false）
//    3. todos.push(新しいTodo) で配列に足す
//    4. 作った Todo を Response.json で返す
//    ※ サーバーを再起動すると、足したTODOは消える（ステップ8でDBにすると消えなくなる）

export const POST = async (request: Request) => {
  const { title } = await request.json();
  const newTodo: Todo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);

  return Response.json(newTodo);
};
