import { Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SuggestedUser } from './SuggestedUser'
import useFetchSuggestedUsers from '../../hooks/useFetchSuggestedUsers'


export const Suggestions = () => {
  const {suggestedUsersSmall, suggestedUsersLarge, isLoading} = useFetchSuggestedUsers()
  const [showLarge, setShowLarge] = useState(false)//If we show 10 users or if we show 5 users (show more or show less)
  const suggestedUsers = showLarge ? suggestedUsersLarge : suggestedUsersSmall
  if(isLoading){//While loading we show loading icon
    return <Flex justifyContent="center" alignItems="center" w={"full"} pt={"100px"}> {/* Set a fixed height */}
                <Spinner size={"xl"}/>
              </Flex>
  }
  console.log("suggestedUsersSmall",suggestedUsersSmall,"suggestedUsersLarge",suggestedUsersLarge)
  return (
        <VStack pt={15} px={4} gap={"30px"} >
        {/*header for suggested users*/}
        <Flex  w={"full"} alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"md"} fontWeight={"600"}>Suggested for you!</Text>
                {/* See more button */}
                <Button size="xs" fontWeight={"600"}  bg={"transparent"} _hover={{textDecor:"underline"}} 
                onClick={() => setShowLarge(!showLarge)}>
                  {showLarge ? "Show Less" : "See more"}
                </Button>
        </Flex>
        {/*The suggested users */}
        {suggestedUsers.map((user) => (
          <SuggestedUser key={user.id} user={user} />
        ))}
        {suggestedUsersSmall.length === 0 && <Text textAlign={"center"}>No more suggested users</Text>}
             <Button size="xs" fontWeight={"300"} bg={"transparent"} _hover={{textDecor:"underline"}} 
             onClick={() => setShowLarge(!showLarge)}>
             {showLarge ? "Show Less" : "See more"}
             </Button>
        </VStack>
  )
}
 