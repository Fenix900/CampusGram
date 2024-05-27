import { Grid } from '@chakra-ui/react'
import React from 'react'
import ProfileImg from "../Assets/TestProfile.png"
import { ProfileSinglePost } from './ProfileSinglePost'


export const ProfileAllPosts = () => {
  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        <ProfileSinglePost img={ProfileImg} likes={10} comments={2}/>
        <ProfileSinglePost img={ProfileImg} likes={1} comments={20}/>
        <ProfileSinglePost img={ProfileImg} likes={0} comments={2}/>
        <ProfileSinglePost img={ProfileImg} likes={11} comments={12}/>
        <ProfileSinglePost img={ProfileImg} likes={430} comments={289}/>
      </Grid>
    </div>
  )
}
