import { Container, Text } from '@chakra-ui/react'
import { OnePost } from './OnePost'
import TestPost1 from "../Assets/LIS_Test.png"
import TestPost2 from "../Assets/mc.png"
import profPIC from "../Assets/username.png"
import useGetPosts from '../../hooks/useGetPosts'

//The overall posts, this will show all the posts with each post as <OnePost>

export const FeedPosts = () => {
  const {posts, isLoading} = useGetPosts();
  console.log(posts)
  return (
    <Container maxW={"continer.sm"} py={10} px={2}>

    </Container>
  )
}
