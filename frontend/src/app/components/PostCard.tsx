import Link from 'next/link'
import Image from 'next/image'
import { Card, Flex, Text, Badge } from '@radix-ui/themes'
import Post from '@/app/types/posts'
import styles from './PostCard.module.css'

interface PostCardProps {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {
    const imageUrl = post.Featured_Image?.url

    return (
        <Link href={`/posts/${post.Slug}`} className={styles.link}>
            <Card className={styles.card}>
                <Flex direction="column" gap="3">
                    {imageUrl && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={imageUrl}
                                alt={post.Featured_Image?.alternativeText || post.Title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                        </div>
                    )}
                    <Flex direction="column" gap="2" p="2">
                        <Text as="p" size="5" weight="bold" className={styles.title}>
                            {post.Title}
                        </Text>
                        <Flex gap="2" align="center" wrap="wrap">
                            {post.Published_Date && (
                                <Text as="span" size="2" color="gray">
                                    {new Date(post.Published_Date).toLocaleDateString('ja-JP')}
                                </Text>
                            )}
                            {post.category && (
                                <Badge color="violet" variant="soft">
                                    {post.category.Name}
                                </Badge>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Link>
    )
}
