import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { SuggestedUser } from './SuggestedUser'


export const Suggestions = () => {
  return (
    <div>
        <VStack pt={20} px={4} gap={"50px"} >
        {/*header for suggested users*/}
        <Flex  w={"full"} alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"md"} fontWeight={"600"}>Suggested for you!</Text>
                <Text fontSize={"xs"} fontWeight={"600"}>See more!</Text>
        </Flex>
        {/*The suggested users */}
            <SuggestedUser username="Hanna Brink" profilePic=""/>
            <SuggestedUser username="Johannes" profilePic=""/>
            <SuggestedUser username="Elias El Hashish" profilePic=""/>
            <SuggestedUser  username="Elias El Hashish" profilePic=""/>

             <Text fontSize={"xs"} fontWeight={"300"}>See more</Text>
        </VStack>
    </div>
  )
}
 