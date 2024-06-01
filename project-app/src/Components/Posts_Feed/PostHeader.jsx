import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

//This is the post header, here is the icon (Profilepic) and the username, when the post is done and you could unfollow
export const PostHeader = ({username, profilePic,postDate}) => {
    const formatDate = (date) => {  //This function just formats the date to either date or time depending when it was posted
        const now = new Date();
        const commentDate = new Date(date);
        if (// Check if the comment was made on the same day
        now.getFullYear() === commentDate.getFullYear() &&
        now.getMonth() === commentDate.getMonth() &&
        now.getDate() === commentDate.getDate()
        ) {
        // Display time if comment was made today without seconds
        return commentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false });
        } else {
        // Display date if comment was made on a different day
        return commentDate.toLocaleDateString();
        }
        };


  return (
    <div>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mb={2}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar size={"sm"} name={username} src={profilePic}/>
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    <Text color={"gray.100"}>{username}</Text>
                    <Box color={"gray.500"} ml={3}> {formatDate(postDate)} </Box> {/* The date */}
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
