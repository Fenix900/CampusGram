import { Avatar, Box, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import ProfileImg from "../Assets/TestProfile.png"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebase';
import { useLocation, useParams } from 'react-router-dom';
import useAuthStore from '../../globalStates/authStore';
import { useEffect } from 'react'
import EditProfileInfo from './EditProfileInfo'
import useProfileInfoStore from '../../globalStates/profileInfoStore'
import { useNavigate } from 'react-router-dom';
import placeholder from '../Assets/NoImage.png'


export const ProfileInformation = () => {
    const userSignedIn = useAuthState(auth);
    const loggedInUser = useAuthStore(state => state.user); //Get the logged in user (to know if we are on our profile or someone else) or if we are not logged in
    console.log(loggedInUser)
    const usernameFromParam = useParams()
    const showEditButton = userSignedIn && loggedInUser.username.toLowerCase()===usernameFromParam.username; //EDIT THIS SO THAT WE DONT HAVE TO CHECK WITH .toLowerCase()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {userProfileInfo} = useProfileInfoStore() //Gets the information about the user (from profileInfoStore.js)
    const isMyProfile = loggedInUser && userProfileInfo.username === loggedInUser.username; //Are we visiting our own page and check if we are authenticated
    
    // Effect to handle navigation on username change
    const { usernameFromURL } = useParams(); //Get the current position from URL
    const navigate = useNavigate(); 
    useEffect(() => {
        if (userProfileInfo.username !== usernameFromURL) {//We check that when userProfileInfo.username is changed from the url name
            navigate('/'+userProfileInfo.username);             //If it has changed then it means that we have changed the username 
        }
    }, [userProfileInfo.username, navigate, usernameFromURL]); //The check is dependent of userProfileInfo.username, does it change then we run this code above
    
    return (
    //This is the header for the profile page, here we will see the profile image,
    //a description and following/followers/posts
    <div>
        {isOpen ? (<EditProfileInfo isOpen={isOpen} onClose={onClose}/>) : null} {/*This have to be better centered so phones have it in the middle */}
        <Flex py={7} direction={{base:"column", sm:"row"}} gap={2}>
            <Avatar size={{base:"xl", md:"2xl"}} name={userProfileInfo.username} src={userProfileInfo.profilePicture  ? userProfileInfo.profilePicture : placeholder} justifySelf={"flex-start"} alignSelf={"flex-start"} mx={{base:2, md:10}}/>
            <VStack gap={{base:2, md:5}} alignItems={"start"}>
                <Flex direction={{base:"column", sm:"row"}} justifyContent={{base:"center", sm:"flex-start"}} w={"full"}>
                    <Text fontSize={{base:"xl", md:"2xl"}} fontWeight={"700"}>{userProfileInfo.username}</Text>
                     <Flex justifyContent={{md:"center", base:"left"}} alignItems={"center"} ml={{sm:10, base:0}}>
                        {showEditButton ? 
                        <Box>
                            {isMyProfile ?
                                <Button bg={"blue.400"} color={"black"} size={{base:"xs", md:"sm"}} _hover={{bg:"blue.200"}} onClick={onOpen}>
                                    Edit Profile
                                </Button>
                                :
                                <Button bg={"blue.400"} color={"black"} size={{base:"xs", md:"sm"}} _hover={{bg:"blue.200"}} onClick={null}>
                                    Follow
                                </Button>}
                            </Box>
                        : null}
                     </Flex>
                </Flex>
                <Flex alignItems={"center"} gap={10}>
                    <VStack>
                        <Text fontSize={"lg"} fontWeight={"800"}>{userProfileInfo.posts.length}</Text>
                        <Text fontSize={"sm"} textAlign="center">Posts</Text>
                    </VStack>
                    <VStack>
                        <Text fontSize={"lg"} fontWeight={"800"}>{userProfileInfo.followers.length}</Text>
                        <Text fontSize={"sm"} textAlign="center">Followers</Text>
                    </VStack>
                    <VStack>
                        <Text fontSize={"lg"} fontWeight={"800"}>{userProfileInfo.following.length}</Text>
                        <Text fontSize={"sm"} textAlign="center">Following</Text>
                    </VStack>
                </Flex>
                <Text fontWeight={"700"} textDecor={"underline"} fontSize={"md"}>{userProfileInfo.profileDisplayName}</Text>
                <Text fontSize={"sm"} mt={{base:0, md:-2}}>{userProfileInfo.bio}</Text>
            </VStack>
        </Flex> 
    </div>
  )
}
