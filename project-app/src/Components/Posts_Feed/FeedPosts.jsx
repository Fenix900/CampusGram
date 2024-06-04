import { Box, Container, Text } from '@chakra-ui/react'
import { OnePost } from './OnePost'
import useGetPosts from '../../hooks/useGetPosts'

//The overall posts, this will show all the posts with each post as <OnePost>

export const FeedPosts = () => {
  const {posts, isLoading} = useGetPosts();
  return (
    <>
      <Container maxW={"continer.sm"} py={10} px={2}>
        {!isLoading && posts.length>0 ?
        <Box>
          { posts.map((post) =>
            <OnePost key={post.id} post={post}/> //We pass the information about the post to this component 
          ) }
        </Box>
        : <Text>No posts to show, follow people to see their posts here</Text>}
      </Container>
    </>
  )
}
