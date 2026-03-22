import Post, { PostsResponse } from '@/app/types/posts'
import NikkiEntry, { NikkiResponse } from '@/app/types/nikki'

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
    const res = await fetch(`${BASE_URL}/blogs`, { headers })

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`)
    }

    const data: PostsResponse = await res.json()
    return data.contents
}

/**
 * 日記一覧を取得する
 */
export async function fetchNikkiEntries(): Promise<NikkiEntry[]> {
    const res = await fetch(`${BASE_URL}/nikki`, { headers })

    if (!res.ok) {
        throw new Error(`Failed to fetch nikki: ${res.status}`)
    }

    const data: NikkiResponse = await res.json()
    return data.contents
}

/**
 * 個別記事をIDで取得する
 */
export async function fetchPostById(id: string): Promise<Post | null> {
    const res = await fetch(`${BASE_URL}/blogs/${encodeURIComponent(id)}`, { headers })

    if (res.status === 404) return null

    if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status}`)
    }

    return res.json()
}
