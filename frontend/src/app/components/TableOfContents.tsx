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

export function extractHeadings(html: string): TocItem[] {
    const headingRegex = /<(h[23])[^>]*>(.*?)<\/h[23]>/gi
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(html)) !== null) {
        const level = parseInt(match[1][1])
        const text = match[2].replace(/<[^>]+>/g, '').trim()
        headings.push({
            id: generateId(text),
            text,
            level,
        })
    }

    return headings
}

export function addHeadingIds(html: string): string {
    return html.replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').trim()
        const id = generateId(text)
        return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
    })
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
