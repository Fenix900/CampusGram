import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Comment = ({commentText}) => {
  return (
    <div>
    <Flex alignItems="flex-start" mt={2} flexDirection="column" mr={4} bg={"gray.600"} borderRadius={10} p={"5px"}>
      <Flex  flexDirection={"row"} w={"full"} alignItems={"center"}>
          {/*<Avatar src={profileImg} name={username} size="md" />*/}
          <Flex justifyContent={"space-between"} w={"full"} flexDirection={{md:"row", sm:"column"}} ml={2}>
            <Text fontWeight="bold">{"REPLACE ME"}</Text>
            <Text fontSize="sm" color="gray.500">{"REPLACE ME"}</Text>
          </Flex>
      </Flex>
      <Text mt={1} mx={2}>{commentText}</Text>
    </Flex>
    </div>
  )
}

export default Comment