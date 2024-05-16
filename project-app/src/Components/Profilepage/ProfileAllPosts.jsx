import { Grid } from '@chakra-ui/react'
import React from 'react'
import ProfileImg from "../Assets/TestProfile.png"
import { ProfileSinglePost } from './ProfileSinglePost'


export const ProfileAllPosts = () => {
  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        <ProfileSinglePost img={ProfileImg}/>
        <ProfileSinglePost img={ProfileImg}/>
        <ProfileSinglePost img={ProfileImg}/>
        <ProfileSinglePost img={ProfileImg}/>
        <ProfileSinglePost img={ProfileImg}/>
      </Grid>
    </div>
  )
}
