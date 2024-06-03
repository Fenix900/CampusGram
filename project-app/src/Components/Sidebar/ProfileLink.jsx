import { Avatar, Box, Flex, Image, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Link as ReactRouterLink} from 'react-router-dom'
import useAuthStore from '../../globalStates/authStore'
import useProfileInfoStore from '../../globalStates/profileInfoStore'

const ProfileLink = () => {
  const userInfo = useAuthStore((state) => state.user);    //Get user info (Fetch user information locally)
  const setUserProfile = useProfileInfoStore(state => state.setUserProfileInfo)

  const handleSetProfileOnNavigation = () =>{ //This function sets the user when we want to navigate to the user profile
    setUserProfile(userInfo)
  }

  return (
    <>
    <Tooltip hasArrow label={"Profile"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" }}>
      <Box alignItems={"center"} justifyContent={{base:"center", md:"flex-start"}} borderRadius={6} onClick={handleSetProfileOnNavigation}>
        <Link 
        display={"flex"}
        to={"/"+userInfo.usernameLower}
        as={ReactRouterLink}
        gap={5}
        _hover={{bg:"gray.700"}}
        p={2}
        w={"full"}
        >
          <Flex
          alignItems={"center"}
          gap={5}
          _hover={{bg:"gray.700"}}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{base:"center", md:"flex-start"}}
          mt={"auto"}
          >
            <Avatar size={{ base: "sm", md: "md" }} name={userInfo.username} src={userInfo.profilePicture} />
            <Box display={{base:"none", md:"block"}}>Profile</Box>
          </Flex>
        </Link> 
      </Box>
    </Tooltip> 
    </>
  )
}

export default ProfileLink