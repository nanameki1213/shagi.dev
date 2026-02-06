'use client'

import { Flex, Text, Container, Box } from '@radix-ui/themes'

export default function SiteFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <Box mt="9" py="6" style={{ borderTop: '1px solid var(--gray-a4)', backgroundColor: 'var(--gray-2)' }}>
            <Container size="4">
                <Flex direction="column" align="center" gap="4">
                    <Text size="1" color="gray">
                        © {currentYear} Shagi Blog. All rights reserved.
                    </Text>
                </Flex>
            </Container>
        </Box>
    )
}
