'use client'

import { Heading, Flex, Text, Box, Grid, Card, Badge, Separator } from '@radix-ui/themes'
import { usePost } from '@/app/hooks/usePosts'
import ReactMarkdown, { Components } from 'react-markdown'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import TableOfContents, { extractHeadings } from '@/app/components/TableOfContents'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ShareButtons from '@/app/components/ShareButtons'
import { useMemo, ReactNode } from 'react'

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

function getTextContent(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('')
  }
  if (typeof children === 'object' && children !== null && 'props' in children) {
    return getTextContent((children as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

function PostDetailSkeleton() {
  return (
    <Grid columns={{ initial: '1', md: '1fr 280px' }} gap="6" width="100%">
      <Box>
        <Box mb="4">
          {/* Breadcrumbs Skeleton */}
          <div className={styles.lineSkeleton} style={{ width: '200px', marginBottom: '1rem' }} />
        </Box>
        <div className={styles.titleSkeleton} />
        <Flex gap="3" mb="6">
          <div className={styles.dateSkeleton} />
          <div className={styles.categorySkeleton} />
        </Flex>

        <Flex direction="column" gap="4">
          <div className={styles.lineSkeleton} />
          <div className={styles.lineSkeleton} />
          <div className={styles.lineSkeleton} style={{ width: '80%' }} />
          <div className={styles.lineSkeleton} />
          <div className={styles.lineSkeleton} style={{ width: '60%' }} />
        </Flex>
      </Box>

      <Box display={{ initial: 'none', md: 'block' }}>
        <div className={styles.tocSkeleton}>
          <div className={styles.tocTitleSkeleton} />
          <div className={styles.tocItemSkeleton} />
          <div className={styles.tocItemSkeleton} style={{ width: '80%' }} />
          <div className={styles.tocItemSkeleton} style={{ width: '60%' }} />
        </div>
      </Box>
    </Grid>
  )
}

export default function PostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: post, isLoading, isError, error } = usePost(slug)

  const markdownComponents: Components = useMemo(() => ({
    h2: ({ children }) => {
      const text = getTextContent(children)
      const id = generateId(text)
      return <Heading as="h2" size="6" id={id} mt="6" mb="4" style={{ scrollMarginTop: '6rem' }}>{children}</Heading>
    },
    h3: ({ children }) => {
      const text = getTextContent(children)
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
    )
  }), [])

  const hasHeadings = useMemo(() => {
    if (!post?.Content) return false
    return extractHeadings(post.Content).length > 0
  }, [post?.Content])

  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (isError) {
    return (
      <Card size="3" style={{ borderColor: 'var(--red-6)', backgroundColor: 'var(--red-2)' }}>
        <Flex direction="column" gap="4" p="4">
          <Heading size="6" color="red">エラー</Heading>
          <Text color="red">記事の取得に失敗しました: {error?.message || 'Unknown error'}</Text>
        </Flex>
      </Card>
    )
  }

  if (!post) {
    return (
      <Card size="3">
        <Flex direction="column" gap="4" p="4" align="center">
          <Heading size="6">記事が見つかりません</Heading>
          <Text color="gray">指定された記事は存在しないか、削除された可能性があります。</Text>
        </Flex>
      </Card>
    )
  }

  const breadcrumbs = [
    ...(post.category ? [{ label: post.category.Name, href: '#' }] : []), // カテゴリリンクは一旦#
    { label: post.Title }
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
