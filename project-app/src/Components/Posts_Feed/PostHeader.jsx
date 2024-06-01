import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

//This is the post header, here is the icon (Profilepic) and the username, when the post is done and you could unfollow
export const PostHeader = ({username, profilePic}) => {
  return (
    <div>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mb={2}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar size={"sm"} name={username} src={profilePic}/>
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    <Text color={"gray.100"}>{username}</Text>
                    <Box color={"gray.500"} ml={3}> IMPLEMENT ME </Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Text
                fontSize={12}
                color={"blue.400"}
                fontWeight={"bold"}
                _hover={{color:"red.400"}}
                transition={"0.1s ease-in-out"}
                >
                    Unfollow (Implement this function)
                </Text>
            </Box>
        </Flex>
    </div>
  )
}
