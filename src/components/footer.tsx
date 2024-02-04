"use client"

import { Flex, Container, Text, Link, IconButton } from "@chakra-ui/react";

import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai"

export const Footer = () => {
  return (
    <Flex py={4} mt={8} direction={{ base: "column", md: "row" }}>
      <Container maxW="container.md">
        <Flex>
          <Flex direction="column">
            <Text variant="sub">by zexyu</Text>
          </Flex>
          <Flex ml="auto">
            <Link isExternal href='https://twitter.com/zexyu'>
              <IconButton color="gray.500" variant="link" aria-label="Twitter" size="sm" as={AiOutlineTwitter} />
            </Link>
            <Link isExternal href='https://github.com/adketuri/itg-stats-merge-web' ml={3}>
              <IconButton color="gray.500" variant="link" aria-label="GitHub" size="sm" as={AiFillGithub} />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};