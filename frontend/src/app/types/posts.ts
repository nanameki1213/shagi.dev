import Category from './category'
import StrapiMedia from './media'

export default interface Post {
  id: number
  documentId: string
  Title: string
  Published_Date: string
  Slug: string
  Content: string
  category?: Category
  Featured_Image?: StrapiMedia
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

// APIレスポンス型
export interface PostsResponse {
  data: Post[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface PostResponse {
  data: Post
}
