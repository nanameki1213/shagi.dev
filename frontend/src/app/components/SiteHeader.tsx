'use client'

import NextLink from 'next/link'
import { Flex, Text, Button, Container, Box } from '@radix-ui/themes'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

export default function SiteHeader() {
    return (
        <Box
            style={{
                borderBottom: '1px solid var(--gray-a4)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: 'var(--color-background)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Container size="4">
                <Flex justify="between" align="center" py="3" px="4">
                    <NextLink href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    </NextLink>

                    <Flex gap="4" align="center">
                        <NextLink href="/" style={{ textDecoration: 'none', color: 'var(--gray-11)' }}>
                            <Text size="2" weight="medium" style={{ transition: 'color 0.2s' }}>Home</Text>
                        </NextLink>

                        <Flex gap="3" ml="2">
                            <Button variant="ghost" color="gray" onClick={() => window.open('https://github.com/nanameki1213', '_blank')}>
                                <GitHubLogoIcon width="18" height="18" />
                            </Button>
                            <Button variant="ghost" color="gray" onClick={() => window.open('https://x.com/shinysheep0158', '_blank')}>
                                <TwitterLogoIcon width="18" height="18" />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}
