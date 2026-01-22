import Post, { PostsResponse } from '@/app/types/posts'

const TOKEN = process.env.NEXT_PUBLIC_TOKEN
const API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * 記事一覧を取得する
 */
export async function fetchPosts(): Promise<Post[]> {
    const res = await fetch(`${API_URL}/api/posts?populate=*&sort=Published_Date:desc`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const data: PostsResponse = await res.json()
    return data.data
}

/**
 * 個別記事をSlugで取得する
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
    const res = await fetch(
        `${API_URL}/api/posts?filters[Slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
    )

    if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status}`)
    }

    const data: PostsResponse = await res.json()
    return data.data[0] || null
}
