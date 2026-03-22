export default interface NikkiEntry {
    id: string
    title: string
    body?: string
    publishedAt?: string
    createdAt?: string
}

export interface NikkiResponse {
    contents: NikkiEntry[]
    totalCount: number
    offset: number
    limit: number
}
