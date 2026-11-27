import type { Todo } from "@/lib/todo";

// id が一致するTODOだけ completed を反転させた「新しい配列」を返す純粋関数
// 約束：受け取った todos も、その中のオブジェクトも書き換えない
export const toggleTodos = (todos: Todo[], id: number): Todo[] => {
  // ===== テストを書いたあとに、ここを自分で書く =====
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
};
