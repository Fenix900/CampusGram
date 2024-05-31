import { Avatar, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAuthStore from '../../globalStates/authStore'
import useFollowAndUnfollowUser from '../../hooks/useFollowAndUnfollowUser'
import { Link } from 'react-router-dom'

export const SuggestedUser = ({user, onClick}) => {
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
        <Link to={"/"+user.username} onClick={onClick} style={{ display: 'block' }}>
          <Flex gap={2} alignItems={"center"} >
            <Avatar src={user.profilePicture} name={user.username} size={"md"}/>
            <Text fontWeight={"900"} fontSize={"12px"}>{user.username}</Text>
          </Flex>
        </Link>
        <Button bg={"transparent"} fontSize={"15px"}  color={"blue.200"} _hover={{color:"white"}} onClick={handleFollow}>
            {isFollow?"Unfollow":"Follow"}
        </Button>
    </Flex>
  )
}