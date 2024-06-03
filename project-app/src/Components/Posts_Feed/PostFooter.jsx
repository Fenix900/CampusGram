import { Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useDisclosure } from '@chakra-ui/react'
import notLikedIcon from '../Assets/LikeIconEmpty.png'
import LikedIcon from '../Assets/LikeIconFilled.png'
import commentsIcon from '../Assets/chat.png'
import usePostComment from '../../hooks/usePostComment'
import useLikePost from '../../hooks/useLikePost'
import ViewCommentPopup from './ViewCommentPopup'

//Post footer, for the like and comment icon, also the comment field.
//We can also see the comment from the user and number of likes/comments

export const PostFooter = ({username, isPostInFeed, post}) => { //isPostInFeed shows likes and comment if it is from the feed
  const [comment, setComment] = useState('')
  const {handlePostComment, isLoading} = usePostComment();
  const {isUpdating, numberOfLikes, isLiked, handleLike} = useLikePost(post)
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  
  const handleTryToPostComment = async () =>{
    await handlePostComment(comment, post.id)
    setComment("")
  }

  return (
    <div>
        {/*This flex is the liked and comment icon */}
        <Flex alignItems={"center"} gap={5} w={"full"} mb={"4px"} mt={"2px"}>
          {!isUpdating ?
            <Box onClick={handleLike} cursor={"pointer"}>
              {!isLiked ? (<Image src={notLikedIcon} boxSize='40px'/>):(<Image src={LikedIcon} boxSize='40px'/>)}
            </Box> 
          : <Spinner size={"xl"}/>}
          {isPostInFeed ? //We don't want to show the comment icon if we are in the profile and viewing 
          <Box cursor={"pointer"} onClick={onOpen}>
            <Image src={commentsIcon}  boxSize='40px'/>
          </Box>
          : null}
        </Flex>
        <Text fontWeight={600} fontSize={'md'}>
          {numberOfLikes} likes
        </Text>
        {isPostInFeed ? <Box>
        <Text fontWeight={800} fontSize={"sm"} mb={2}>
          {username} {" "}
          <Text as={"span"} fontWeight={400}>
            {post.descText}
          </Text>
          {post.comments.length === 0 ? 
          <Text fontWeight={300} fontSize={"sm"}>
            No comments yet
          </Text> 
          :
          <Text fontWeight={300} fontSize={"sm"} onClick={onOpen} cursor={"pointer"}>
            View all {post.comments.length} {post.comments.length < 2 ? "comment" : "comments"}
          </Text>}
        </Text>
      </Box> : 
      null }
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <InputGroup>
        <Input 
          variant={"filled"} 
          placeholder={"Write something nice..."} 
          fontSize={"md"} 
          _placeholder={{ opacity: 1, color: 'gray.600' }} 
          value={comment} 
          onChange={(e) => setComment(e.target.value)}/>
          <InputRightElement>
            <Button fontSize={"sm"} color={"blue.400"} bg={"transparent"} _hover={{color:"white"}} onClick={handleTryToPostComment} isLoading={isLoading}>Post</Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <ViewCommentPopup isOpen={isOpen} onClose={onClose} post={post}/>
    </div>
    
  )
}
