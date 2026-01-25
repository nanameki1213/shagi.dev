// src/components/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  // QueryClient を useState で保持することで、再レンダリング時に
  // インスタンスが再作成されるのを防ぎます
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 必要に応じてデフォルト設定を追加
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
