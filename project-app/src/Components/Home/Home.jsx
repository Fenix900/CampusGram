import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { FeedPosts } from '../Posts_Feed/FeedPosts'
import { Suggestions } from '../suggestionForUsers/Suggestions'

//The home page, the side bar should be here, the feed and also a suggestion, but is only shown during bigger screens
export default function Home() {
  return (
      <Container maxW={"container.lg "}>
        <Flex gap={7}>
          <Box flex={2} py={50}>
            <FeedPosts/>
          </Box>
          <Box 
          flex={3} 
          mr={5}
          display={{base:"none", lg:"block"}}
          maxW={"300px"}
          borderLeft={"1px solid grey"}
          >
            <Suggestions></Suggestions>
          </Box>
        </Flex>
      </Container>
  )
}