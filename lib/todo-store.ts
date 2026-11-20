// TODOの置き場所（ステップ8でデータベースに置き換えるまでの仮置き）
// /api/todos と /api/todos/[id] の2つのファイルから同じ配列を使うため、ここに移した
// ※ サーバーを再起動すると、最初の3件に戻る

import type { Todo } from "@/lib/todo";

export const todos: Todo[] = [
  { id: 1, title: "読書", completed: false },
  { id: 2, title: "掃除", completed: false },
  { id: 3, title: "洗濯", completed: false },
];
