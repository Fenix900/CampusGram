import { Box, Button, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import Comment from '../Profilepage/Comment'
import useAuthStore from '../../globalStates/authStore'
import { PostFooter } from './PostFooter'
import usePostComment from '../../hooks/usePostComment'

const ViewCommentPopup = ({isOpen, onClose, post}) => {
    //This is for posting comment in the modal
    const [comment, setComment] = useState('')
    const {handlePostComment, isLoading} = usePostComment();
    const handleTryToPostComment = async () =>{
        await handlePostComment(comment, post.id)
        setComment("")
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent minH={"40%"} maxH={"90%"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                    <ModalBody overflowY="auto" maxH="80%">
                        {post.descText !== "" ? //This is to show the initial comment from the creator to have a description on the image
                        <Box borderBottom={"1px solid gray"} mb={6} pb={2}> 
                            <Comment comment={{postedByID:post.createByUser, postID:post.id, commentText:post.descText, createdDate:post.createdTime}} />
                        </Box>
                        : null}
                        {post.comments.map((comment) => ( //Display the rest of the comments
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </ModalBody>
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} p={5}>
                            <InputGroup>
                            <Input 
                            variant={"filled"} 
                            placeholder={"Write something nice..."} 
                            fontSize={"md"} 
                            _placeholder={{ opacity: 1, color: 'gray.600' }} 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)}/>
                            <InputRightElement>
                                <Button fontSize={"sm"} color={"blue.400"} bg={"transparent"} _hover={{color:"white"}} onClick={handleTryToPostComment} isLoading={isLoading}>Post</Button>
                            </InputRightElement>
                            </InputGroup>
                        </Flex>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewCommentPopup
