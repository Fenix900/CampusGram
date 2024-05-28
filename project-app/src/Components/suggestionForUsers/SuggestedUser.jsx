import { Avatar, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAuthStore from '../../globalStates/authStore'
import useFollowAndUnfollowUser from '../../hooks/useFollowAndUnfollowUser'

export const SuggestedUser = ({user}) => {
    const [isFollow, setIsFollow] = useState(false)
    const loggedInUser = useAuthStore(state => state.user)
    const {isFollowing,handleFollowOrUnfollowUser,isLoading} = useFollowAndUnfollowUser(user.userID)

    const handleFollow = () => {
      setIsFollow(isFollowing)
      handleFollowOrUnfollowUser()
    }

    // Update isFollow state based on isFollowing value
    useEffect(() => {
      setIsFollow(isFollowing);
    }, [isFollowing]);

    if(isLoading){
      return <Spinner/>
    }

  return (
    <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"} gap={2}>
        <Flex gap={2} alignItems={"center"} >
            <Avatar src={user.profilePicture} name={user.username} size={"md"}/>
            <Text fontWeight={"900"} fontSize={"12px"}>{user.username}</Text>
            {/*<Text fontWeight={"900"} fontSize={"12px"}>{followers}</Text>*/}
        </Flex>
        <Button bg={"transparent"} fontSize={"15px"}  color={"blue.200"} _hover={{color:"white"}} onClick={handleFollow}>
            {isFollow?"Unfollow":"Follow"}
        </Button>
    </Flex>
  )
}