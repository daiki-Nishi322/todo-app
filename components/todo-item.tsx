import type { Todo } from "@/lib/todo";

// TODO 1件を表示する部品。
// データの変更（mutation）は親の page.tsx が持つ。この部品は「表示」と「押されたことを親に知らせる」だけ
type TodoItemProps = {
  todo: Todo; // ① 表示する1件
  onToggle: (id: number) => void; // ② チェックが押されたら、親に id を渡して知らせる
  onDelete: (id: number) => void; // ③ 削除が押されたら、親に id を渡して知らせる
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  // ===== ここから下を自分で書く =====
  // page.tsx の <li>〜</li> の中身を参考に、return で <li> を返す
  // 違いは2つだけ：
  //   - toggleMutation.mutate(...) の代わりに onToggle(...) を呼ぶ
  //   - deleteMutation.mutate(...) の代わりに onDelete(...) を呼ぶ

  return (
    <li  className="flex gap-2">
      {/* ⑤ チェックボックス：checked は今の状態。押されたら onToddleで親に知らせる */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {/* ⑥ 完了なら取り消し線（三項演算子） */}
      <span className={todo.completed ? "line-through text-gray-400" : ""}>
        {todo.title}
      </span>
      {/* ⑦ 削除ボタン：押されたら onDeleteで親に知らせる */}
      <button className="border px-1" onClick={() => {
        if (!confirm("削除しますか？")) return;
        onDelete(todo.id)
      }}>
        削除
      </button>
    </li>
  )
};
