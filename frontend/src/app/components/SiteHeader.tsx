import NextLink from 'next/link'
import { Flex, Text, Container, Box } from '@radix-ui/themes'
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
                        <NextLink href="/nikki" style={{ textDecoration: 'none', color: 'var(--gray-11)' }}>
                            <Text size="2" weight="medium" style={{ transition: 'color 0.2s' }}>日記</Text>
                        </NextLink>

                        <Flex gap="3" ml="2">
                            <a href="https://github.com/nanameki1213" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--gray-11)' }}>
                                <GitHubLogoIcon width="18" height="18" />
                            </a>
                            <a href="https://x.com/shinysheep0158" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'var(--gray-11)' }}>
                                <TwitterLogoIcon width="18" height="18" />
                            </a>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}
