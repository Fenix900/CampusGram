import { Box, Container, Image, Text } from '@chakra-ui/react'
import { OnePost } from './OnePost'
import TestPost1 from "../Assets/LIS_Test.png"
import TestPost2 from "../Assets/mc.png"
import profPIC from "../Assets/username.png"
import useGetPosts from '../../hooks/useGetPosts'

//The overall posts, this will show all the posts with each post as <OnePost>

export const FeedPosts = () => {
  const {posts, isLoading} = useGetPosts();
  return (
    <Container maxW={"continer.sm"} py={10} px={2}>
      {!isLoading && posts.length>0 ?
      <Box>
        { posts.map((post) =>
          <OnePost post={post}/> //We pass the information about the post to this component 
        ) }
      </Box>
      : <Text>No posts to show, follow people to see their posts here</Text>}
    </Container>
  )
}
