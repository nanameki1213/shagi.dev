// src/app/posts/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getPostGetPostsQueryKey, postGetPosts } from '@/gen/post/post' // パスは適宜調整
import PostListClient from '@/app/components/PostListClient'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  // 1. サーバーサイドでAPIを叩く
  // queryKeyを共通化するためにOrvalの生成関数を使うのがコツです
  await queryClient.prefetchQuery({
    queryKey: getPostGetPostsQueryKey(),
    queryFn: () => postGetPosts().then((res) => {
      console.log("res:", res);
      res.data
    }),
  })

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">記事一覧</h1>

      {/* 2. データをシリアライズしてクライアントへ渡す */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostListClient />
      </HydrationBoundary>
    </main>
  )
}
