import Post, { PostsResponse } from '@/app/types/posts'

const API_KEY = process.env.MICROCMS_API_KEY
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`

const headers = {
    'X-MICROCMS-API-KEY': API_KEY ?? '',
}

/**
 * 記事一覧を取得する
 */
export async function fetchPosts(): Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/posts`, { headers })

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const data: PostsResponse = await res.json()
    return data.contents
}

/**
 * 個別記事をSlugで取得する
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
    const res = await fetch(
        `${BASE_URL}/posts?filters=Slug[equals]${encodeURIComponent(slug)}`,
        { headers }
    )

    if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status}`)
    }

    const data: PostsResponse = await res.json()
    return data.contents[0] ?? null
}
