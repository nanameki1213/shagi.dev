// src/components/PostListClient.tsx
'use client'

import Link from 'next/link'
import { usePostGetPosts } from '@/gen/post/post'

export default function PostListClient() {
  // すでにサーバー側でprefetchされているため、即座にdataが入る
  const { data: response, isLoading, error } = usePostGetPosts({
    populate: '*',
  })

  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>エラーが発生しました</p>

  // Strapiのレスポンス構造に合わせてアクセス
  // (Strapi v4/v5などのバージョンにより data.data だったり直下だったりします)
  const posts = response?.data

  return (
    <div className="grid gap-4">
      {posts?.map((post) => (
        <div key={post.id} className="border p-4 rounded hover:bg-gray-50">
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-semibold">{post.Title}</h2>
            {/* Strapiの場合 post.attributes.title のような形式かもしれません */}
            <p className="text-gray-500 text-sm">ID: {post.id}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}
