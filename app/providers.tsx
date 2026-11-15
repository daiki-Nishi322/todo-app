"use client";

// TanStack Query を使うための準備（AIが用意）
// QueryClient は、useQuery が取ってきたデータを覚えておく「保管庫」。
// アプリ全体をこの Provider で包むと、どの画面からでも useQuery が使える
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
