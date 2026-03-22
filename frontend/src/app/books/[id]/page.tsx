import NextLink from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Container, Heading, Text, Separator } from '@radix-ui/themes'
import { fetchBooks, fetchBookById } from '@/app/lib/api'
import styles from './page.module.css'

export async function generateStaticParams() {
    const books = await fetchBooks()
    return books.map((b) => ({ id: b.id }))
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const book = await fetchBookById(id)

    if (!book) notFound()

    return (
        <Container size="2" px="4" py="8">
            <NextLink href="/books" className={styles.backLink}>← 読書メモ</NextLink>
            <Separator size="4" my="6" />
            <div className={styles.layout}>
                <div className={styles.coverWrapper}>
                    {book.coverImage ? (
                        <Image
                            src={book.coverImage.url}
                            alt={book.title}
                            fill
                            className={styles.coverImage}
                            sizes="200px"
                            priority
                        />
                    ) : (
                        <div className={styles.noCover}>
                            <span className={styles.noCoverTitle}>{book.title}</span>
                        </div>
                    )}
                </div>
                <div className={styles.body}>
                    <Heading size="5" mb="1">{book.title}</Heading>
                    {book.author && (
                        <Text size="2" color="gray" mb="3" as="p">{book.author}</Text>
                    )}
                    {book.category && (
                        <NextLink
                            href={`/books/category/${encodeURIComponent(book.category)}`}
                            className={styles.categoryBadge}
                        >
                            {book.category}
                        </NextLink>
                    )}
                    {book.review && (
                        <>
                            <Separator size="4" my="4" />
                            <Text as="p" size="2" style={{ lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
                                {book.review}
                            </Text>
                        </>
                    )}
                </div>
            </div>
        </Container>
    )
}
