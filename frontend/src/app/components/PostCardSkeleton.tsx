'use client'

import { Card, Flex } from '@radix-ui/themes'
import styles from './PostCardSkeleton.module.css'

export default function PostCardSkeleton() {
    return (
        <Card className={styles.card}>
            <Flex direction="column" gap="3">
                <div className={styles.imageSkeleton} />
                <Flex direction="column" gap="2" p="2">
                    <div className={styles.titleSkeleton} />
                    <Flex gap="2" align="center">
                        <div className={styles.dateSkeleton} />
                        <div className={styles.badgeSkeleton} />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
