import { Box, Container, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { ProfileAllPosts } from './ProfileAllPosts'
import { ProfileInformation } from './ProfileInformation'
import { ProfileSections } from './ProfileSections'
import useGetProfileByName from '../../hooks/useGetProfileByName'
import { useParams } from 'react-router-dom'
import { CouldNotFindUser } from './CouldNotFindUser'

export const Profile = () => {
  const { username } = useParams(); //Since we use "username" as a parameter in the url we can extract it
  const usernameLower = username.toLowerCase(); //make it to lower for safer query searching
  const {isLoading,userProfileInfo} = useGetProfileByName(usernameLower)
  if(!userProfileInfo && !isLoading){ //no user found
    return <CouldNotFindUser />
  }
  return (
    <div>
        <Container maxW={"container.lg"}>
            <Flex px={5} pt={10} w={"full"} mx={"auto"} flexDirection={"column"} pb={{base:2, md:5}}>
                {!isLoading && userProfileInfo ? <ProfileInformation/> 
                : <Spinner size={"xl"} alignSelf={"center"}/> /*When the user is being loaded we show a spinner */} 
            </Flex>
            <Flex px={{base:2, md:4}} maxW={"full"} mx={"auto"} direction={"column"}>
                <ProfileSections />
                <ProfileAllPosts />
            </Flex>
        </Container>
    </div>
  )
}
