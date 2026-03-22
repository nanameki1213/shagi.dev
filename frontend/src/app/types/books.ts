import MicroCMSImage from '@/app/types/media'

export default interface BookEntry {
    id: string
    title: string
    author?: string
    category?: string
    review?: string
    coverImage?: MicroCMSImage
    publishedAt?: string
    createdAt?: string
}

export interface BooksResponse {
    contents: BookEntry[]
    totalCount: number
    offset: number
    limit: number
}
