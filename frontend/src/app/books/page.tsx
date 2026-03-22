import NextLink from 'next/link'
import { Container, Heading, Text, Separator } from '@radix-ui/themes'
import { fetchBooks } from '@/app/lib/api'
import BookCard from './BookCard'
import styles from './page.module.css'

export default async function BooksPage() {
    const entries = await fetchBooks()
    const categories = [...new Set(entries.map((e) => e.category).filter(Boolean) as string[])]

    return (
        <Container size="3" px="4" py="8">
            <Heading size="6" mb="6">読書メモ</Heading>
            <Separator size="4" mb="6" />
            {categories.length > 0 && (
                <nav className={styles.categoryNav}>
                    <NextLink href="/books" className={`${styles.categoryLink} ${styles.categoryLinkActive}`}>
                        すべて
                    </NextLink>
                    {categories.map((cat) => (
                        <NextLink
                            key={cat}
                            href={`/books/category/${encodeURIComponent(cat)}`}
                            className={styles.categoryLink}
                        >
                            {cat}
                        </NextLink>
                    ))}
                </nav>
            )}
            {entries.length === 0 ? (
                <Text color="gray" size="2">まだ記録がありません。</Text>
            ) : (
                <div className={styles.grid}>
                    {entries.map((entry) => (
                        <BookCard key={entry.id} entry={entry} />
                    ))}
                </div>
            )}
        </Container>
    )
}
