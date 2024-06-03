import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Comment from '../Profilepage/Comment'
import useAuthStore from '../../globalStates/authStore'

const ViewCommentPopup = ({isOpen, onClose, post}) => {
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
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewCommentPopup
