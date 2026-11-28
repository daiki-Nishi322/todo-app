import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Vitest の設定
export default defineConfig({
  resolve: {
    // ① "@/lib/todo" の "@" を、このフォルダ（todo-app）として読めるようにする。tsconfig.json の paths と同じ意味
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    // ② API（サーバー側）のテストなので、ブラウザではなく Node.js の環境で動かす
    environment: "node",
  },
});
