import NextLink from 'next/link'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronRightIcon } from '@radix-ui/react-icons'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <Flex align="center" gap="2" wrap="wrap" mb="4">
            <NextLink href="/" style={{ textDecoration: 'none' }}>
                <Text size="2" color="gray" style={{ transition: 'color 0.2s' }} className="hover:text-blue-600">
                    Home
                </Text>
            </NextLink>

            {items.map((item, index) => (
                <Flex key={index} align="center" gap="2">
                    <ChevronRightIcon color="gray" />
                    {item.href ? (
                        <NextLink href={item.href} style={{ textDecoration: 'none' }}>
                            <Text size="2" color="gray" style={{ transition: 'color 0.2s' }} className="hover:text-blue-600">
                                {item.label}
                            </Text>
                        </NextLink>
                    ) : (
                        <Text size="2" color="gray" weight="medium">
                            {item.label}
                        </Text>
                    )}
                </Flex>
            ))}
        </Flex>
    )
}
