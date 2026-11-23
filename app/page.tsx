"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/lib/todo";
import { TodoItem } from "@/components/todo-item";

// 一覧を取る：GET /api/todos
const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch("/api/todos");
  return res.json();
};

// 追加する：POST /api/todos
const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

// ===== ステップ6b =====
// ① 完了を切り替える：PATCH /api/todos/[id]
//    URLに id を入れる。送る本文はないので body も headers もいらない
const toggleTodo = async (id: number): Promise<Todo> => {
  const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
  return res.json();
};

// ② 削除する：DELETE /api/todos/[id]
//    fetch は 400 や 404 でもエラーにならない（届いたので成功扱い）
//    → res.ok（200番台なら true）を見て、だめなら throw でエラーにする。すると useMutation の onError が動く
const deleteTodo = async (id: number) => {
  const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }
};

export default function Home() {
  const { data, isLoading } = useQuery({ queryKey: ["todos"], queryFn: getTodos });
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  // 成功したら一覧を取り直す（3つの mutation で同じなので、関数にまとめた）
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const addMutation = useMutation({ mutationFn: addTodo, onSuccess: refresh });

  // ③ 切り替えと削除の mutation。形は addMutation と同じ
  const toggleMutation = useMutation({ mutationFn: toggleTodo, onSuccess: refresh });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: refresh,
    onError: (error) => alert(error.message), // ④ throw したエラーの文言を表示する
  });

  const handleAdd = () => {
    addMutation.mutate(text);
    setText("");
  };

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
          <TodoItem key={todo.id} todo={todo}
            onToggle={(id) => toggleMutation.mutate(id)}
            onDelete={(id) => deleteMutation.mutate(id)} />
        ))}
      </ul>
    </main>
  );
}
