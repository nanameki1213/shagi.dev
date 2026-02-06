'use client'

import { Flex, Button, Tooltip, IconButton } from '@radix-ui/themes'
import { TwitterLogoIcon, Link2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'

interface ShareButtonsProps {
    title: string
    url?: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    // クライアントサイドでのみURLを取得（SSR対策）
    const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : ''

    const handleTwitterShare = () => {
        const text = encodeURIComponent(title)
        const link = encodeURIComponent(shareUrl)
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, '_blank')
    }

    const handleCopyLink = async () => {
        if (typeof navigator !== 'undefined') {
            try {
                await navigator.clipboard.writeText(shareUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Failed to copy: ', err)
            }
        }
    }

    return (
        <Flex gap="3" align="center" my="4">
            <Tooltip content="Share on X (Twitter)">
                <Button size="2" variant="soft" color="gray" onClick={handleTwitterShare}>
                    <TwitterLogoIcon />
                    Share
                </Button>
            </Tooltip>

            <Tooltip content={copied ? "Copied!" : "Copy Link"}>
                <IconButton size="2" variant="soft" color={copied ? "green" : "gray"} onClick={handleCopyLink}>
                    <Link2Icon />
                </IconButton>
            </Tooltip>
        </Flex>
    )
}
