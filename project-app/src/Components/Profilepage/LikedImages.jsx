import React from 'react'
import useFetchLikedImages from '../../hooks/useFetchLikedImages'
import { Box, Grid, Spinner, Text } from '@chakra-ui/react';
import { ProfileSinglePost } from './ProfileSinglePost';

const LikedImages = () => {
  const {isLoading, likedPosts} = useFetchLikedImages()
  const noLikedPosts = likedPosts.length===0 && !isLoading;
  return (
      <Box display={"flex"} justifyContent={"center"}>
      {isLoading ? <Spinner size={"2xl"}/> 
      :
      noLikedPosts ? <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign={"center"}>No posts yet</Text> 
      :
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {likedPosts.map((post) => ( //This maps all the images to <ProfileSinglePost/> with corresponding values
        <ProfileSinglePost post={post}/>
        ))}
      </Grid>
      }
    </Box>
  )
}

export default LikedImages