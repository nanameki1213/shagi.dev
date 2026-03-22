import { Container, Heading, Text, Flex, Separator } from '@radix-ui/themes'
import { fetchNikkiEntries } from '@/app/lib/api'

function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(dateStr)).replace(/\//g, '-')
}

export default async function NikkiPage() {
    const entries = await fetchNikkiEntries()

    return (
        <Container size="2" px="4" py="8">
            <Heading size="6" mb="6">日記</Heading>
            <Separator size="4" mb="6" />
            {entries.length === 0 ? (
                <Text color="gray" size="2">まだ日記がありません。</Text>
            ) : (
                <Flex direction="column" gap="4">
                    {entries.map((entry) => (
                        <Flex key={entry.id} align="baseline" gap="5">
                            <Text
                                size="2"
                                color="gray"
                                style={{ fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}
                            >
                                {entry.publishedAt ? formatDate(entry.publishedAt) : ''}
                            </Text>
                            <Text size="3">{entry.title}</Text>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Container>
    )
}
