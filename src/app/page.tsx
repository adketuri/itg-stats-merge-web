"use client"

import { Box, Button, Input, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box>
      <form action="/api/upload" method="post" encType="multipart/form-data">
        <Text>ITG</Text>
        <Input type="file" name="itg" required />
        <Text>ECFA</Text>
        <Input type="file" name="ecfa" required />
        <Button type="submit">Combine</Button>
      </form>
    </Box>
  )
}

