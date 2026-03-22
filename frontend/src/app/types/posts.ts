import Category from './category'
import MicroCMSImage from './media'

export default interface Post {
    id: string
    title: string
    content: string
    eyecatch?: MicroCMSImage
    category?: Category
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    revisedAt?: string
}

export interface PostsResponse {
    contents: Post[]
    totalCount: number
    offset: number
    limit: number
}
