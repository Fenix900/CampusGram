import { Avatar, Box, Flex, Image, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Link as ReactRouterLink} from 'react-router-dom'
import useAuthStore from '../../globalStates/authStore'

const ProfileLink = () => {
  const userInfo = useAuthStore((state) => state.user);    //Get user info (Fetch user information locally)

  return (
    <Tooltip hasArrow label={"Profile"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" }}>
        <Link 
        display={"flex"}
        to={"/"+userInfo.usernameLower}
        as={ReactRouterLink}
        alignItems={"center"}
        gap={5}
        _hover={{bg:"gray.700"}}
        borderRadius={6}
        p={2}
        w={"full"}
        justifyContent={{base:"center", md:"flex-start"}}
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
    </Tooltip> 
  )
}

export default ProfileLink