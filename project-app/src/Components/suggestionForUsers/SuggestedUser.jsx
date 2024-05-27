import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export const SuggestedUser = ({username, profilePic}) => {
    const [isFollow, setIsFollow] = useState(false)

  return (
    <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"} gap={2} >
        <Flex gap={2} alignItems={"center"} >
            <Avatar src={profilePic} name={username} size={"md"}/>
            <Text fontWeight={"900"} fontSize={"12px"}>{username}</Text>
        </Flex>
        <Button bg={"transparent"} fontSize={"15px"}  color={"blue.200"} _hover={{color:"white"}} onClick={() => setIsFollow(!isFollow)}>
            {isFollow?"Unfollow":"Follow"}
        </Button>
    </Flex>
  )
}

