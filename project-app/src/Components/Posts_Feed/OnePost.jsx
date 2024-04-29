import React from 'react'
import { PostHeader } from './PostHeader'
import { Image } from '@chakra-ui/react'
import TestPost from "../Assets/TestPostImage.png"
import { PostFooter } from './PostFooter'

export const OnePost = () => {
  return (
    <div>
      <PostHeader />
      <Image src={TestPost} />
      <PostFooter />
    </div>
  )
}
