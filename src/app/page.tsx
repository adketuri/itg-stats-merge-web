"use client"

import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { main } from "itg-stats-merge"

export default function Home() {
  useEffect(() => {
    console.log("hello")
    main()
  }, [])
  return (
    <Box>Hello</Box>
  )
}

