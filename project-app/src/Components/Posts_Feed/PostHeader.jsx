import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useFollowAndUnfollowUser from '../../hooks/useFollowAndUnfollowUser';
import { Link } from 'react-router-dom';
import useProfileInfoStore from '../../globalStates/profileInfoStore';

//This is the post header, here is the icon (Profilepic) and the username, when the post is done and you could unfollow
export const PostHeader = ({username, profilePic,postDate, postOwnerUser}) => {
    const {isFollowing,handleFollowOrUnfollowUser,isLoading} = useFollowAndUnfollowUser(postOwnerUser.userID) //This is for unfollowing users in the feed
    const setClickedUsersProfile = useProfileInfoStore(state => state.setUserProfileInfo)

    const formatDate = (date) => {  //This function just formats the date to either date or time depending when it was posted
        const now = new Date();
        const commentDate = new Date(date);
        if (// Check if the comment was made on the same day
        now.getFullYear() === commentDate.getFullYear() &&
        now.getMonth() === commentDate.getMonth() &&
        now.getDate() === commentDate.getDate()
        ) {
        // Display time if comment was made today without seconds
        return commentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false });
        } else {
        // Display date if comment was made on a different day
        return commentDate.toLocaleDateString();
        }
    };


  return (
    <div>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mb={2}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={"/"+postOwnerUser.usernameLower} onClick={() => setClickedUsersProfile(postOwnerUser)}>
                    <Avatar size={"sm"} name={username} src={profilePic}/>
                </Link>
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    <Text color={"gray.100"}>{username}</Text>
                    <Box color={"gray.500"} ml={3}> {formatDate(postDate)} </Box> {/* The date */}
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Text
                fontSize={12}
                color={"blue.400"}
                fontWeight={"bold"}
                _hover={{color:"red.400"}}
                transition={"0.1s ease-in-out"}
                onClick={handleFollowOrUnfollowUser}
                isLoading={isLoading}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Text>
            </Box>
        </Flex>
    </div>
  )
}
