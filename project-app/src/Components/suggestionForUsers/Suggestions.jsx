import { Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { SuggestedUser } from './SuggestedUser'
import useFetchSuggestedUsers from '../../hooks/useFetchSuggestedUsers'


export const Suggestions = () => {
  const {suggestedUsers, isLoading} = useFetchSuggestedUsers()
  console.log(suggestedUsers)
  if(isLoading){//While loading we show loading icon
    return <Flex justifyContent="center" alignItems="center" w={"full"} pt={"100px"}> {/* Set a fixed height */}
                <Spinner size={"xl"}/>
              </Flex>
  }
  return (
    <div>
        <VStack pt={20} px={4} gap={"50px"} >
        {/*header for suggested users*/}
        <Flex  w={"full"} alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"md"} fontWeight={"600"}>Suggested for you!</Text>
                <Text fontSize={"xs"} fontWeight={"600"}>See more!</Text>
        </Flex>
        {/*The suggested users */}
        {suggestedUsers.map((users) => (
          <SuggestedUser username={users.username} profilePic={users.profilePicture}/>
        ))}

            <SuggestedUser  username="Elias El Hashish" profilePic=""/>

             <Text fontSize={"xs"} fontWeight={"300"}>See more</Text>
        </VStack>
    </div>
  )
}
 