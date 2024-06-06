import React from 'react'
import { PostHeader } from './PostHeader'
import { Box, Image, Spinner } from '@chakra-ui/react'
import { PostFooter } from './PostFooter'
import useFetchUserInfoByUserID from '../../hooks/useFetchUserInfoByUserID'

//This is how one post is struct. (Header then the image and lastly the footer)
export const OnePost = ({post}) => {
  const {user, isLoading} = useFetchUserInfoByUserID(post.createByUser) //Fetching the user that own this post

  return (
    <div>
        {isLoading ? <Spinner /> :
          <Box pb={100}>
            <PostHeader username={user.username} profilePic={user.profilePicture} postDate={post.createdTime} postOwnerUser={user}/>
            <Image src={post.imageURL} alt={"Whops, couldn't load image from "+ user.username} my={2} w={"full"}/>
            <PostFooter username={user.username} isPostInFeed={true} post={post}/>
          </Box>
        }
    </div>
  )
}