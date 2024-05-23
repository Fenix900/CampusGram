import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { ProfileAllPosts } from './ProfileAllPosts'
import { ProfileInformation } from './ProfileInformation'
import { ProfileSections } from './ProfileSections'
import useGetProfileByName from '../../hooks/useGetProfileByName'
import { useParams } from 'react-router-dom'

export const Profile = () => {
  const { username } = useParams(); //Since we use "username" as a parameter in the url we can extract it
  const usernameLower = username.toLowerCase();
  const {isLoading,userProfileInfo} = useGetProfileByName(usernameLower)
  console.log("username_",usernameLower)
  console.log("profile",userProfileInfo)
  if( !userProfileInfo){
    console.log("user not found")
  }
  
  return (
    <div>
        <Container maxW={"container.lg"}>
            <Flex px={5} pt={10} w={"full"} mx={"auto"} flexDirection={"column"} pb={{base:2, md:5}}>
                <ProfileInformation/>
            </Flex>
            <Flex px={{base:2, md:4}} maxW={"full"} mx={"auto"} direction={"column"}>
                <ProfileSections />
                <ProfileAllPosts />
            </Flex>
        </Container>
    </div>
  )
}
