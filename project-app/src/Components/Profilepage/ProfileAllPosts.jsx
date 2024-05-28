import { Box, Grid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { ProfileSinglePost } from './ProfileSinglePost'
import useFetchUsersPosts from '../../hooks/useFetchUsersPosts'


export const ProfileAllPosts = () => {
  const {isLoading, userPosts} = useFetchUsersPosts()
  console.log("users all img",userPosts)
  const onePost = userPosts[4];
  const noPosts = userPosts.length===0 && !isLoading;
  return (
    <Box display={"flex"} justifyContent={"center"}>
      {isLoading ? <Spinner size={"2xl"}/> 
      :
      noPosts ? <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign={"center"}>No posts yet</Text> :
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {userPosts.map((post) => ( //This maps all the images to <ProfileSinglePost/> with corresponding values
        <ProfileSinglePost
          key={post.id}
          img={post.imageURL}
          likes={post.likes.length}
          comments={post.comments.length}
          caption={post.descText}
        />
        ))}
      </Grid>
      }
    </Box>
  )
}
