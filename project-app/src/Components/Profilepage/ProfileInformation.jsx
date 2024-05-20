import { Avatar, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import ProfileImg from "../Assets/TestProfile.png"

export const ProfileInformation = () => {
  return (
    //This is the header for the profile page, here we will see the profile image,
    //a description and following/followers/posts
    <div>
        <Flex py={7} direction={{base:"column", sm:"row"}} gap={2}>
            <Avatar size={{base:"xl", md:"2xl"}} name='Replace Name' src={ProfileImg} alt="N/A" justifySelf={"flex-start"} alignSelf={"flex-start"} mx={{base:2, md:10}}/>
            <VStack gap={{base:2, md:5}} alignItems={"start"}>
                <Flex direction={{base:"column", sm:"row"}} justifyContent={{base:"center", sm:"flex-start"}} w={"full"}>
                    <Text fontSize={{base:"xl", md:"2xl"}} fontWeight={"700"}>The Username</Text>
                     <Flex justifyContent={{md:"center", base:"left"}} alignItems={"center"} ml={{sm:10, base:0}}>
                        <Button bg={"blue.400"} color={"black"} size={{base:"xs", md:"sm"}} _hover={{bg:"blue.200"}}>
                            Edit Profile
                        </Button>
                     </Flex>
                </Flex>
                <Flex alignItems={"center"} gap={10}>
                    <Text fontSize={"sm"} textAlign="center" >
                        <Text fontSize={"lg"} fontWeight={"800"}>10</Text>
                        Posts
                    </Text>
                    <Text fontSize={"sm"} textAlign="center">
                        <Text fontSize={"lg"} fontWeight={"800"}>10</Text>
                        Followers
                    </Text>
                    <Text fontSize={"sm"} textAlign="center">
                        <Text fontSize={"lg"} fontWeight={"800"}>10</Text>
                        Following
                    </Text>
                </Flex>
                <Text fontWeight={"700"} textDecor={"underline"} fontSize={"md"}>Fenix900 (what the user wants?)</Text>
                <Text fontSize={"sm"} mt={{base:0, md:-2}}>The discription for what I am doing and what my lift is!!!</Text>
            </VStack>
        </Flex> 
    </div>
  )
}
