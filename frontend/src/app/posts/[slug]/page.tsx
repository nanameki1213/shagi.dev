import { Heading, Flex, Text, Box, Grid, Badge, Separator } from '@radix-ui/themes'
import { fetchPosts, fetchPostBySlug } from '@/app/lib/api'
import ReactMarkdown, { Components } from 'react-markdown'
import styles from './page.module.css'
import TableOfContents, { extractHeadings } from '@/app/components/TableOfContents'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ShareButtons from '@/app/components/ShareButtons'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const posts = await fetchPosts()
    return posts.map((post) => ({ slug: post.Slug }))
}

function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

const markdownComponents: Components = {
    h2: ({ children }) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateId(text)
        return <Heading as="h2" size="6" id={id} mt="6" mb="4" style={{ scrollMarginTop: '6rem' }}>{children}</Heading>
    },
    h3: ({ children }) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateId(text)
        return <Heading as="h3" size="4" id={id} mt="5" mb="3" style={{ scrollMarginTop: '6rem' }}>{children}</Heading>
    },
    p: ({ children }) => (
        <Text as="p" size="3" mb="4" style={{ lineHeight: 1.8, color: 'var(--gray-12)' }}>
            {children}
        </Text>
    ),
    ul: ({ children }) => (
        <ul style={{ listStyleType: 'disc', paddingLeft: '1rem', marginBottom: '1rem' }}>{children}</ul>
    ),
    ol: ({ children }) => (
        <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem', marginBottom: '1rem' }}>{children}</ol>
    ),
    li: ({ children }) => (
        <li style={{ marginBottom: '0.5rem' }}><Text size="3">{children}</Text></li>
    ),
    blockquote: ({ children }) => (
        <Box my="4" pl="4" style={{ borderLeft: '4px solid var(--gray-6)', color: 'var(--gray-11)' }}>
            {children}
        </Box>
    ),
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await fetchPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const hasHeadings = extractHeadings(post.Content).length > 0

    const breadcrumbs = [
        ...(post.category ? [{ label: post.category.Name, href: '#' }] : []),
        { label: post.Title },
    ]

    return (
        <Grid columns={{ initial: '1', md: '1fr 280px' }} gap="8" width="100%">
            <Box>
                <Breadcrumbs items={breadcrumbs} />

                <article>
                    <Heading as="h1" size="8" mb="4" style={{ lineHeight: 1.2 }}>
                        {post.Title}
                    </Heading>

                    <Flex gap="3" align="center" mb="6">
                        <Text size="2" color="gray">
                            {post.Published_Date && new Date(post.Published_Date).toLocaleDateString('ja-JP')}
                        </Text>
                        {post.category && (
                            <Badge color="violet" variant="soft">
                                {post.category.Name}
                            </Badge>
                        )}
                    </Flex>

                    <Separator size="4" my="6" />

                    <div className={styles.content}>
                        <ReactMarkdown components={markdownComponents}>{post.Content}</ReactMarkdown>
                    </div>

                    <Separator size="4" my="8" />

                    <ShareButtons title={post.Title} />
                </article>
            </Box>

            {hasHeadings && (
                <Box display={{ initial: 'none', md: 'block' }}>
                    <TableOfContents content={post.Content} />
                </Box>
            )}
        </Grid>
    )
}
