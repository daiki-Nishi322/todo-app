"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/lib/todo";

// ① 一覧の取り方：GET /api/todos を fetch して、JSON を Todo[] として返す関数
//    （async のアロー関数。fetch → res.json() を return）
const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch("/api/todos");
  return res.json();
};

// ===== ステップ5 =====
// ⑤ 追加のしかた：POST /api/todos に { title } を送る関数
//    （RAGボットの fetch と同じ形。method、headers、body を書く）
const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export default function Home() {
  // ② useQuery で一覧を取る。queryKey は ["todos"]、queryFn は ① の getTodos
  //    戻り値から data と isLoading を取り出す（分割代入）
  const todosQuery = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  const { data, isLoading } = todosQuery;

  const [text, setText] = useState("");

  // ⑥ useQueryClient() で保管庫を取り出す（取り直しに使う）
  const queryClient = useQueryClient();
  // ⑦ useMutation を作る
  //    mutationFn：⑤ の addTodo
  //    onSuccess：queryClient.invalidateQueries({ queryKey: ["todos"] }) で一覧を取り直す

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = () => {
    // ⑧ ⑦ の mutate(text) を呼んで送る。そのあと入力欄を空にする
    addMutation.mutate(text);
    setText("");
  };

  // ③ 取得中なら「読み込み中…」を返す（早期リターン。discussion-view.tsx と同じ）

  if (isLoading) {
    return <p className="p-8">読み込み中...</p>;
  }
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">TODO</h1>

      <input
        className="border"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="border" onClick={handleAdd}>
        追加
      </button>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}
