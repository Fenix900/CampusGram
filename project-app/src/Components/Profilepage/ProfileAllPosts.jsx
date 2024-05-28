import { Grid } from '@chakra-ui/react'
import React from 'react'
import ProfileImg from "../Assets/TestProfile.png"
import high from "../Assets/highImage.jpeg"
import wide from "../Assets/mc.png"
import { ProfileSinglePost } from './ProfileSinglePost'


export const ProfileAllPosts = () => {
  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        <ProfileSinglePost img={ProfileImg} likes={10} comments={2}/>
        <ProfileSinglePost img={high} likes={1} comments={20}/>
        <ProfileSinglePost img={wide} likes={0} comments={2}/>
        <ProfileSinglePost img={ProfileImg} likes={11} comments={12}/>
        <ProfileSinglePost img={ProfileImg} likes={430} comments={289}/>
      </Grid>
    </div>
  )
}
