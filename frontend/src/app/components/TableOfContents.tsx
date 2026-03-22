'use client'

import { useMemo, useEffect, useState } from 'react'
import styles from './TableOfContents.module.css'
import { extractHeadings } from '@/app/lib/headings'

interface TableOfContentsProps {
    content: string
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
