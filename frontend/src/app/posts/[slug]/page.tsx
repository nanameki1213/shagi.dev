import { Heading, Flex, Text, Box, Grid, Badge, Separator } from '@radix-ui/themes'
import { fetchPosts, fetchPostById } from '@/app/lib/api'
import styles from './page.module.css'
import TableOfContents, { extractHeadings, addHeadingIds } from '@/app/components/TableOfContents'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ShareButtons from '@/app/components/ShareButtons'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const posts = await fetchPosts()
    return posts.map((post) => ({ slug: post.id }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await fetchPostById(slug)

    if (!post) {
        notFound()
    }

    const contentWithIds = addHeadingIds(post.content)
    const hasHeadings = extractHeadings(post.content).length > 0

    const breadcrumbs = [
        ...(post.category ? [{ label: post.category.name, href: '#' }] : []),
        { label: post.title },
    ]

    return (
        <Grid columns={{ initial: '1', md: '1fr 280px' }} gap="8" width="100%">
            <Box>
                <Breadcrumbs items={breadcrumbs} />

                <article>
                    <Heading as="h1" size="8" mb="4" style={{ lineHeight: 1.2 }}>
                        {post.title}
                    </Heading>

                    <Flex gap="3" align="center" mb="6">
                        {post.publishedAt && (
                            <Text size="2" color="gray">
                                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                            </Text>
                        )}
                        {post.category && (
                            <Badge color="violet" variant="soft">
                                {post.category.name}
                            </Badge>
                        )}
                    </Flex>

                    <Separator size="4" my="6" />

                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: contentWithIds }}
                    />

                    <Separator size="4" my="8" />

                    <ShareButtons title={post.title} />
                </article>
            </Box>

            {hasHeadings && (
                <Box display={{ initial: 'none', md: 'block' }}>
                    <TableOfContents content={post.content} />
                </Box>
            )}
        </Grid>
    )
}
