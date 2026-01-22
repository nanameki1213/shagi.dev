// Strapi Media File Type (based on PluginUploadFileDocument schema)
export default interface StrapiMedia {
    documentId: string
    id: number
    name: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    formats?: {
        thumbnail?: StrapiMediaFormat
        small?: StrapiMediaFormat
        medium?: StrapiMediaFormat
        large?: StrapiMediaFormat
    }
    hash: string
    ext?: string
    mime: string
    size: number
    url: string
    previewUrl?: string
    provider: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

export interface StrapiMediaFormat {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    url: string
}
