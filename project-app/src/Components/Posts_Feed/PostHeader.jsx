import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const PostHeader = () => {
  return (
    <div>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mb={2}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar size={"sm"} name='Fanny' src='https://bit.ly/broken-link'/>
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    <Text color={"gray.100"}>Fanny</Text>
                    <Box color={"gray.500"}>- 3 years </Box>
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
                    Unfollow
                </Text>
            </Box>
        </Flex>
    </div>
  )
}
