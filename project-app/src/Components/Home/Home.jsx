import { Box, Container, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { FeedPosts } from '../Posts_Feed/FeedPosts'
import { Suggestions } from '../suggestionForUsers/Suggestions'
import useAuthUser from '../../globalStates/authStore'

//The home page, the side bar should be here, the feed and also a suggestion, but is only shown during bigger screens
export default function Home() {
  const currentUser = useAuthUser((state)=>state.user);
  return (
      <Container maxW={"container.lg "}>
        <Flex gap={20}>
          <Box flex={2} py={100}>
            {/*This doesn't have time to get username since we use await so we have to have a placeholder "Username_null"*/}
            <Text>Welcome {currentUser ? (currentUser.username) : (<Spinner />)}</Text>
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