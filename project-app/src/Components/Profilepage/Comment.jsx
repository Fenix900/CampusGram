import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Comment = ({username,date,profileImg,commentText}) => {
  return (
    <div>
<Flex alignItems="flex-start" mt={2} flexDirection="column" mr={4} mb={7} >
  <Flex  flexDirection={"row"} w={"full"} alignItems={"center"}>
      <Avatar src={profileImg} name={username} size="md" />
      <Flex justifyContent={"space-between"} w={"full"} flexDirection={{md:"row", sm:"column"}} ml={2}>
        <Text fontWeight="bold">{username}</Text>
        <Text fontSize="sm" color="gray.500">{date}</Text>
      </Flex>
  </Flex>
  <Text mt={1} mx={2}>{commentText}</Text>
</Flex>
    </div>
  )
}

export default Comment