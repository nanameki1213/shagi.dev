import Category from './category'
import MicroCMSImage from './media'

export default interface Post {
    id: string
    Title: string
    Published_Date: string
    Slug: string
    Content: string
    category?: Category
    Featured_Image?: MicroCMSImage
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
