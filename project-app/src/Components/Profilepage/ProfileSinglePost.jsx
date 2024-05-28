import { Avatar, Box, Button, Flex, GridItem, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import Comment from './Comment'
import useProfileInfoStore from '../../globalStates/profileInfoStore'
//This is one post that will show the image with an overlay to see like and comments
export const ProfileSinglePost = ({img,likes,comments,caption}) => {
    //Hook for open and closing pop-ups
const { isOpen, onOpen, onClose } = useDisclosure()
const {userProfileInfo} = useProfileInfoStore();
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
                    {likes}
                </Flex>
                <Flex flexDirection="column" textAlign="center" fontSize={{sm:"md", base:"xs", lg:"xl"}}>
                    <Text fontWeight={"700"}>comments</Text>    {/*Replace this and likes with icons */}
                    {comments}
                </Flex>
            </Flex> 
            <Image src={img} h={"100%"} w={"100%"} objectFit={"cover"}/>
        </GridItem>

        {/*This part below will show the pop-up window to display image and comments */}
        <Modal isOpen={isOpen} onClose={onClose} size={{base:"3xl", md:"5xl"}} isCentered={true}>
        <ModalOverlay />
        <ModalContent pb={5}>
            <ModalHeader>
                <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfileInfo.profilePicture} size={{md:"md",base:"sm"}}/>
                    <Text>{userProfileInfo.username}</Text>
                    <Button bg={"red.600"} _hover={{bg:"gray.200", color:"red"}} size={"xs"}>Delete post</Button>
                </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Flex flexDirection={{base:"column",sm:"row"}} gap={10} >
            <Box
                overflow={"hidden"}
                maxH={"80vh"}
                maxW={"100%"}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Image
                    src={img}
                    alt='Could not load'
                    objectFit={"contain"}
                    maxH={{base:"40vh",sm:"80vh"}}
                    maxW={"100%"}
                    height="auto"
                    width="auto"
                />
            </Box>
                {/*Fix this so that the comment section title is above all other! at all ti,mes */}
                <Flex flexDirection={"column"} gap={2}>
                    {caption!=="" ? //This will pin the creators comment to the top of the comment section (IF they have written a comment)
                            <Box>
                                <Comment username={userProfileInfo.username} date={"FIXA DETTA"} profileImg={userProfileInfo.profilePicture} commentText={caption}/>
                            </Box>
                    : null}
                    <Text alignSelf={"center"} fontWeight={"900"} fontSize={"sm"} borderBottom={"1px solid gray"} w={"full"} textAlign={"center"}>Comments section</Text>
                    <Flex 
                    flexDirection={"column"} 
                    maxW={{md:"40vw",sm:"50vw", base:"100vw"}} 
                    fontSize={{md:"md",sm:"sm", base:"md"}} 
                    gap={2} 
                    overflowY={"scroll"} 
                    maxH={{md:"460px",sm:"350px", base:"300px"}}
                    borderBottom={"1px solid gray"}
                    mb={2}>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"Someone who has a really long name"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                        <Comment username={"filip"} date={"yesterday"} profileImg={img} commentText={"I really love your image, when will we see more"}/>
                    </Flex>
                    <Text>Add the post footer here when merged!</Text>
                </Flex>
            </Flex>
            </ModalBody>
        </ModalContent>
        </Modal>
    </div>
  )
}
