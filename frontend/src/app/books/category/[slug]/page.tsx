import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Heading, Text, Separator } from '@radix-ui/themes'
import { fetchBooks } from '@/app/lib/api'
import BookCard from '../../BookCard'
import styles from '../../page.module.css'

export async function generateStaticParams() {
    const books = await fetchBooks()
    const categories = [...new Set(books.map((b) => b.category).filter(Boolean) as string[])]
    return categories.map((cat) => ({ slug: encodeURIComponent(cat) }))
}

export default async function BookCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const category = decodeURIComponent(slug)

    const allBooks = await fetchBooks()
    const categories = [...new Set(allBooks.map((b) => b.category).filter(Boolean) as string[])]

    if (!categories.includes(category)) notFound()

    const entries = allBooks.filter((b) => b.category === category)

    return (
        <Container size="3" px="4" py="8">
            <Heading size="6" mb="6">読書メモ</Heading>
            <Separator size="4" mb="6" />
            <nav className={styles.categoryNav}>
                <NextLink href="/books" className={styles.categoryLink}>
                    すべて
                </NextLink>
                {categories.map((cat) => (
                    <NextLink
                        key={cat}
                        href={`/books/category/${encodeURIComponent(cat)}`}
                        className={`${styles.categoryLink} ${cat === category ? styles.categoryLinkActive : ''}`}
                    >
                        {cat}
                    </NextLink>
                ))}
            </nav>
            {entries.length === 0 ? (
                <Text color="gray" size="2">このカテゴリーの本はまだありません。</Text>
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
