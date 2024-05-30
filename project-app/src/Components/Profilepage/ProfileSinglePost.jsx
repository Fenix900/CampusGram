import { Avatar, Box, Button, Flex, GridItem, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import Comment from './Comment'
import useProfileInfoStore from '../../globalStates/profileInfoStore'
import useAuthStore from '../../globalStates/authStore'
import { useDisplayError } from '../../hooks/useDisplayError'
import img from "../Assets/TestPostImage.png"
import { firestore, storage } from '../../Firebase/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import usePostsStore from '../../globalStates/postsStore'
import { PostFooter } from '../Posts_Feed/PostFooter'
//This is one post that will show the image with an overlay to see like and comments
export const ProfileSinglePost = ({post}) => {
    //Hook for open and closing pop-ups
const { isOpen, onOpen, onClose } = useDisclosure()
const {userProfileInfo, deletePost} = useProfileInfoStore();
const loggedInUser = useAuthStore((state) => state.user)
const showMessage = useDisplayError();
const deletePostFunc = usePostsStore(state => state.deletePost)

const isLoggedIn = loggedInUser !== null ? true : false; //are the user logged in?
const showDeleteButton = isLoggedIn && userProfileInfo.userID === loggedInUser.userID; //If the user is logged in and its their profile we show the delete button

const [isLoading, setIsLoading] = useState(false);
const handleDeletePost = async () => {
    if(isLoading){
        showMessage("Wait","Just a second while we work")
        return
    }
    setIsLoading(true);
    if(!window.confirm("Confirm!")){
        console.log("didn't delete post")
        setIsLoading(false);
        return
    }
    try {
        console.log("started deleting")
        console.log("post.id", post.id)
        // Delete the image from Firebase Storage
        const imageRef = ref(storage, "posts/"+post.id);
        await deleteObject(imageRef);
        // Delete the document from Firestore
        const imageDocRef = doc(firestore, "posts/"+post.id);
        await deleteDoc(imageDocRef);
        // Delete the post from the users "posts"-array
        const userDocRef = doc(firestore, "users/"+loggedInUser.userID);
        await updateDoc(userDocRef, {posts: arrayRemove(post.id)});
        deletePostFunc(post.id)
        deletePost(post.id) //Deletes the post locally to updated the ui
        showMessage("Deleted","Post has been deleted","success");
        onClose();
    } catch (e) {
        showMessage("Error",e.message,"error")
    }finally{
        setIsLoading(false)
    }
}

  return (
    <div>
        <GridItem cursor={"pointer"} borderRadius={6} aspectRatio={1/1} position={"relative"} onClick={onOpen}>
            <Flex 
            flexDirection={{base:"column",md:"row"}}
            opacity={0} 
            _hover={{opacity:0.7}} 
            bg={"black"} 
            transition={"all 0.7 ease"} 
            justifyContent={"center"} 
            h={"full"} 
            w={"full"} 
            position={"absolute"}
            gap={{base:0,sm:3, md:6}}
            alignItems={"center"}>
                <Flex flexDirection="column" textAlign="center" fontSize={{sm:"md", base:"xs", lg:"xl"}}>
                    <Text fontWeight={"700"}>likes</Text> 
                    {post.likes.length}
                </Flex>
                <Flex flexDirection="column" textAlign="center" fontSize={{sm:"md", base:"xs", lg:"xl"}}>
                    <Text fontWeight={"700"}>comments</Text>    {/*Replace this and likes with icons */}
                    {post.comments.length}
                </Flex>
            </Flex> 
            <Image src={post.imageURL} h={"100%"} w={"100%"} objectFit={"cover"}/>
        </GridItem>

        {/*This part below will show the pop-up window to display image and comments */}
        <Modal isOpen={isOpen} onClose={onClose} size={{base:"3xl", md:"5xl"}} isCentered={true}>
        <ModalOverlay />
        <ModalContent pb={5}>
            <ModalHeader>
                <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfileInfo.profilePicture} size={{md:"md",base:"sm"}}/>
                    <Text>{userProfileInfo.username}</Text>
                    {showDeleteButton ? //We show the delete button if it is our own post
                        <Button bg={"red.600"} _hover={{bg:"gray.200", color:"red"}} size={"xs"} onClick={handleDeletePost} isLoading={isLoading}>
                            Delete post
                        </Button>
                        : null
                    }
                </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Flex flexDirection={{base:"column",sm:"row"}} gap={{base:2,sm:10}}>
            <Box
                overflow={"hidden"}
                maxH={{ base: "40vh", sm: "80vh" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Image
                    src={post.imageURL}
                    alt='Could not load'
                    objectFit={"contain"}
                    maxH={{base:"40vh",sm:"100vh"}}
                    maxW={"100%"}
                    height="auto"
                    width="auto"
                />
            </Box>
                <Flex justifyContent={"space-between"} flexDirection={"column"} w={{base:"full",md:"60%"}}>
                    <Flex flexDirection={"column"} gap={2} h={"full"} borderBottom={"1px solid gray"}>
                        {post.descText!=="" ? //This will pin the creators comment to the top of the comment section (IF they have written a comment)
                        <Box>
                            {/* Create a comment object for the comment component that is shown from the user who created it, it is easier than creating new component */}
                            <Comment comment={{postedByID:userProfileInfo.userID, postID:post.id, commentText:post.descText, createdDate:post.createdTime}} />
                        </Box>
                        : null}
                        <Text alignSelf={"center"} fontWeight={"900"} fontSize={"sm"} borderBottom={"1px solid gray"} w={"full"} textAlign={"center"}>Comments section</Text>
                        <Flex 
                        flexDirection={"column"} 
                        fontSize={{md:"md",sm:"sm", base:"md"}} 
                        gap={3} 
                        overflowY={"scroll"} 
                        maxH={{sm: "45vh",md:"50vh", base: "175px" }}
                        mb={2}>
                            {post.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment}/>
                            ))}
                        </Flex>
                    </Flex>
                    <PostFooter username={"filip"} isPostInFeed={false} post={post}/>
                </Flex>
            </Flex>
            </ModalBody>
        </ModalContent>
        </Modal>
    </div>
  )
}
