'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchPosts, fetchPostBySlug } from '@/app/lib/api'
import Post from '@/app/types/posts'

/**
 * 記事一覧を取得するカスタムフック
 */
export function usePosts() {
    return useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })
}

/**
 * 個別記事を取得するカスタムフック
 */
export function usePost(slug: string) {
    return useQuery<Post | null, Error>({
        queryKey: ['post', slug],
        queryFn: () => fetchPostBySlug(slug),
        enabled: !!slug,
    })
}
