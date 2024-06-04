import { Box, Grid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { ProfileSinglePost } from './ProfileSinglePost'
import useFetchUsersPosts from '../../hooks/useFetchUsersPosts'


export const ProfileAllPosts = () => {
  const {isLoading, posts} = useFetchUsersPosts()
  const noPosts = posts.length===0 && !isLoading;
  return (
    <Box display={"flex"} justifyContent={"center"}>
      {isLoading ? <Spinner size={"2xl"}/> 
      :
      noPosts ? <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign={"center"}>No posts yet</Text> :
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {posts.map((post) => ( //This maps all the images to <ProfileSinglePost/> with corresponding values
        <ProfileSinglePost key={post.id} post={post}/>
        ))}
      </Grid>
      }
    </Box>
  )
}
