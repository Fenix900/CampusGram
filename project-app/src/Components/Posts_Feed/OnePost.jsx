import React from 'react'
import { PostHeader } from './PostHeader'
import { Image } from '@chakra-ui/react'
import { PostFooter } from './PostFooter'

//This is how one post is struct. (Header then the image and lastly the footer)
export const OnePost = ({postedImg,username,profilePic}) => {
  return (
    <div>
      <PostHeader username={username} profilePic={profilePic}/>
      <Image src={postedImg} alt={"Whops, couldn't load image from "+ username} my={2}/>
      <PostFooter username={username} isPostInFeed={true}/>
    </div>
  )
}
