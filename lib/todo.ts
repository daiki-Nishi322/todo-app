// TODO 1件の形。画面（page.tsx）とAPI（route.ts）の両方で使うので、ここにまとめる
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
