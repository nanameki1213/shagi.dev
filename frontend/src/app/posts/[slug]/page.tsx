'use client'

import { Heading, Flex, Text } from '@radix-ui/themes'
import { usePost } from '@/app/hooks/usePosts'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'next/navigation'
import styles from './page.module.css'

function PostDetailSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.titleSkeleton} />
      <Flex gap="2" className={styles.metaSkeleton}>
        <div className={styles.dateSkeleton} />
        <div className={styles.categorySkeleton} />
      </Flex>
      <div className={styles.contentSkeleton}>
        <div className={styles.lineSkeleton} />
        <div className={styles.lineSkeleton} />
        <div className={styles.lineSkeleton} style={{ width: '80%' }} />
        <div className={styles.lineSkeleton} />
        <div className={styles.lineSkeleton} style={{ width: '60%' }} />
      </div>
    </div>
  )
}

export default function PostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: post, isLoading, isError, error } = usePost(slug)

  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (isError) {
    return (
      <Flex direction="column" gap="4" p="4">
        <Heading size="6">エラー</Heading>
        <Text color="red">記事の取得に失敗しました: {error?.message || 'Unknown error'}</Text>
      </Flex>
    )
  }

  if (!post) {
    return (
      <Flex direction="column" gap="4" p="4">
        <Heading size="6">記事が見つかりません</Heading>
        <Text color="gray">指定された記事は存在しないか、削除された可能性があります。</Text>
      </Flex>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.Title}</h1>
      <Flex gap="2" className={styles.meta}>
        <Text as="p" size="2" color="gray">
          {post.Published_Date && new Date(post.Published_Date).toLocaleDateString('ja-JP')}
        </Text>
        {post.category && (
          <Text as="p" size="2" color="violet">
            カテゴリ：{post.category.Name}
          </Text>
        )}
      </Flex>
      <div className={styles.content}>
        <ReactMarkdown>{post.Content}</ReactMarkdown>
      </div>
    </div>
  )
}
