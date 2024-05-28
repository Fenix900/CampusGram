import { Box, Grid, Spinner } from '@chakra-ui/react'
import React from 'react'
import ProfileImg from "../Assets/TestProfile.png"
import high from "../Assets/highImage.jpeg"
import wide from "../Assets/mc.png"
import { ProfileSinglePost } from './ProfileSinglePost'
import useFetchUsersPosts from '../../hooks/useFetchUsersPosts'


export const ProfileAllPosts = () => {
  const {isLoading, userPosts} = useFetchUsersPosts()
  console.log("users all img",userPosts)
  const onePost = userPosts[4];
  return (
    <Box display={"flex"} justifyContent={"center"}>
      {isLoading ? <Spinner size={"2xl"}/> 
      :
        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
          {userPosts.map((post) => ( //This maps all the images to <ProfileSinglePost/> with corresponding values
            <ProfileSinglePost
              key={post.id}
              img={post.imageURL}
              likes={post.likes.length}
              comments={post.comments.length}
            />
          ))}
        </Grid>
      }
    </Box>
  )
}
