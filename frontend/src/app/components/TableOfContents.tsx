'use client'

import { useMemo, useEffect, useState } from 'react'
import styles from './TableOfContents.module.css'

interface TocItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    content: string
}

function generateId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export function extractHeadings(markdown: string): TocItem[] {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        headings.push({
            id: generateId(text),
            text,
            level,
        })
    }

    return headings
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')

    const headings = useMemo(() => extractHeadings(content), [content])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-80px 0% -80% 0%',
                threshold: 0,
            }
        )

        headings.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [headings])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    if (headings.length === 0) {
        return null
    }

    return (
        <nav className={styles.toc} aria-label="目次">
            <h2 className={styles.tocTitle}>目次</h2>
            <ul className={styles.tocList}>
                {headings.map((heading, index) => (
                    <li
                        key={`${heading.id}-${index}`}
                        className={`${styles.tocItem} ${styles[`level${heading.level}`]}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`${styles.tocLink} ${activeId === heading.id ? styles.active : ''}`}
                            onClick={(e) => handleClick(e, heading.id)}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
