import { Container } from '@chakra-ui/react'
import React from 'react'
import { OnePost } from './OnePost'

export const FeedPosts = () => {
  return (
    <Container maxW={"continer.sm"} py={10} px={2}>
         <OnePost />
         <OnePost />
         <OnePost />
         <OnePost />
    </Container>
  )
}
