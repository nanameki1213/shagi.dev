import Link from 'next/link'
import Image from 'next/image'
import BookEntry from '@/app/types/books'
import styles from './page.module.css'

const COVER_GRADIENTS = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    'linear-gradient(135deg, #ffecd2, #fcb69f)',
    'linear-gradient(135deg, #84fab0, #8fd3f4)',
]

function getCoverGradient(id: string): string {
    const sum = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return COVER_GRADIENTS[sum % COVER_GRADIENTS.length]
}

export default function BookCard({ entry }: { entry: BookEntry }) {
    return (
        <article className={styles.book}>
            <Link href={`/books/${entry.id}`} className={styles.coverLink}>
                <div className={styles.coverWrapper}>
                    {entry.coverImage ? (
                        <Image
                            src={entry.coverImage.url}
                            alt={entry.title}
                            fill
                            className={styles.coverImage}
                            sizes="(max-width: 600px) 40vw, 160px"
                        />
                    ) : (
                        <div
                            className={styles.noCover}
                            style={{ background: getCoverGradient(entry.id) }}
                        >
                            <span className={styles.noCoverTitle}>{entry.title}</span>
                        </div>
                    )}
                </div>
            </Link>
            <div className={styles.info}>
                <Link href={`/books/${entry.id}`} className={styles.titleLink}>
                    <span className={styles.title}>{entry.title}</span>
                </Link>
                {entry.author && (
                    <div className={styles.meta}>
                        <span>{entry.author}</span>
                    </div>
                )}
            </div>
        </article>
    )
}
