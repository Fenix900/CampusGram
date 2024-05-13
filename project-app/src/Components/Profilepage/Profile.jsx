import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { ProfileAllPosts } from './ProfileAllPosts'
import { ProfileInformation } from './ProfileInformation'
import { ProfileSections } from './ProfileSections'

export const Profile = () => {
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
