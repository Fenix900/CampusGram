import { Avatar, Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import useFetchUserInfoByUserID from '../../hooks/useFetchUserInfoByUserID'
import { Link } from 'react-router-dom'

const Comment = ({comment}) => {
  const  {user, isLoading} = useFetchUserInfoByUserID(comment.postedByID)

  const formatDate = (date) => {  //This function just formats the date to either date or time depending when it was posted
                                          //If the comment was done the same year/month/day then we display the time otherwise the date
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
    {!isLoading ?
      <Flex alignItems="flex-start" mt={2} flexDirection="column" mr={4} bg={"gray.600"} borderRadius={10} p={"5px"}>
        <Flex  flexDirection={"row"} w={"full"} alignItems={"center"}>
          <Link to={"/"+user.usernameLower}>
            <Avatar src={user.profilePicture} name={user.username} size="md" />
          </Link>
            <Flex justifyContent={"space-between"} w={"full"} flexDirection={{md:"row", sm:"column"}} ml={2}>
              <Text fontWeight="bold">{user.username}</Text>
              <Text fontSize="sm" color="gray.500">{formatDate(comment.createdDate)}</Text>
            </Flex>
        </Flex>
        <Text mt={1} mx={2}>{comment.commentText}</Text>
      </Flex> 
      : <Spinner/>}
    </div>
  )
}

export default Comment