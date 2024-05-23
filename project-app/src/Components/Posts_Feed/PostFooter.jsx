import { Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import notLikedIcon from '../Assets/LikeIconEmpty.png'
import LikedIcon from '../Assets/LikeIconFilled.png'
import commentsIcon from '../Assets/chat.png'

//Post footer, for the like and comment icon, also the comment field.
//We can also see the comment from the user and number of likes/comments

export const PostFooter = ({username}) => {
  const [liked, setLiked] = useState(false);
  const [nmbrLikes, setNmberLikes] = useState(10);
//Handles the number of likes and if a post is liked
  const handleLike = () =>{
    if(liked===true){
      setLiked(false);
      setNmberLikes(nmbrLikes-1);
    }
    else{
      setLiked(true);
      setNmberLikes(nmbrLikes+1);
    }
  } 

  return (
    <div>
      {/*This flex is the liked and comment icon */}
      <Flex alignItems={"center"} gap={5} w={"full"} mb={"4px"} mt={"2px"}>
        <Box onClick={handleLike} cursor={"pointer"}>
          {!liked ? (<Image src={notLikedIcon} boxSize='40px'/>):(<Image src={LikedIcon} boxSize='40px'/>)}
        </Box>
        <Box cursor={"pointer"}>
          <Image src={commentsIcon}  boxSize='40px'/>
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'md'}>
        {nmbrLikes} likes
      </Text>
    
      <Text fontWeight={800} fontSize={"sm"} mb={2}>
         {username} {" "}
        <Text as={"span"} fontWeight={400}>
          Isn't it nice?
        </Text>
        <Text fontWeight={300} fontSize={"sm"}>
          View all XXX comments
        </Text>
      </Text>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} mb={12}>
        <InputGroup>
        <Input variant={"filled"} placeholder={"Write something nice..."} fontSize={"md"} _placeholder={{ opacity: 1, color: 'gray.600' }}/>
          <InputRightElement>
            <Button fontSize={"sm"} color={"blue.400"} bg={"transparent"} _hover={{color:"white"}}>Post</Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </div>
    
  )
}