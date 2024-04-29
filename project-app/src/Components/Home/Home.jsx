import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { FeedPosts } from '../Posts_Feed/FeedPosts'


export default function Home() {
  return (
      <Container maxW={"container.lg "}>
        <Flex gap={20}>
          <Box flex={2} py={100}>
            <FeedPosts/>
          </Box>
          <Box 
          flex={3} 
          mr={20}
          display={{base:"none", lg:"block"}}
          maxW={"300px"}
          border={"1px solid red"}
          >
            suggested users
          </Box>
        </Flex>
      </Container>
  )
}