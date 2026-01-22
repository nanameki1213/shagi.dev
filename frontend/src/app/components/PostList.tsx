'use client'

import { Flex, Text, Heading, Separator } from '@radix-ui/themes'
import { usePosts } from '@/app/hooks/usePosts'
import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'

export default function PostList() {
    const { data: posts, isLoading, isError, error } = usePosts()

    if (isError) {
        return (
            <Flex direction="column" gap="4">
                <Heading size="6">最新の記事</Heading>
                <Separator size="4" />
                <Text color="red">
                    記事の取得に失敗しました: {error?.message || 'Unknown error'}
                </Text>
            </Flex>
        )
    }

    return (
        <Flex direction="column" gap="4" p="4">
            <Heading size="6">最新の記事</Heading>
            <Separator size="4" />
            <Flex direction="column" gap="3">
                {isLoading ? (
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                ) : (
                    posts?.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </Flex>
        </Flex>
    )
}
