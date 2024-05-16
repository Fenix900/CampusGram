import { Avatar, Box, Button, Flex, GridItem, Image, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton} from '@chakra-ui/react'
//This is one post that will show the image with an overlay to see like and comments
export const ProfileSinglePost = ({img}) => {
    //Hook for open and closing pop-ups
const { isOpen, onOpen, onClose } = useDisclosure()

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
                    <Text fontWeight={"700"}>Likes</Text> 
                    20
                </Flex>
                <Flex flexDirection="column" textAlign="center" fontSize={{sm:"md", base:"xs", lg:"xl"}}>
                    <Text fontWeight={"700"}>comments</Text>    {/*Replace this and likes with icons */}
                    5
                </Flex>
            </Flex> 
            <Image src={img} h={"100%"} w={"100%"} objectFit={"cover"}/>
        </GridItem>

        <Modal isOpen={isOpen} onClose={onClose} size={{base:"2xl", md:"3xl"}} isCentered={true}>
        <ModalOverlay />
        <ModalContent pb={5}>
            <ModalHeader>
                <Flex alignItems={"center"} gap={4}>
                    <Avatar src={img} size={{md:"md",base:"sm"}}/>
                    <Text>Username</Text>
                    <Button bg={"red.600"} _hover={{bg:"gray.200", color:"red"}} size={"xs"}>Delete post</Button>
                </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Flex flexDirection={{base:"column",sm:"row"}} gap={10} >
                <Box overflow={"hidden"}>
                    <Image src={img} alt='Could not load'/>
                </Box>

                <Flex flexDirection={"column"} maxW={{md:"30vh",sm:"20vh", base:"100vh"}} fontSize={{md:"md",sm:"sm", base:"md"}} gap={2}>
                    <Text alignSelf={"center"} fontWeight={"900"} fontSize={"sm"} borderBottom={"1px solid gray"} w={"full"} textAlign={"center"}>Comments section</Text>
                    <Text>Hello Everyone</Text>
                    <Text>LOL</Text>
                    <Text>I really love your image, when will we see more</Text>
                    <Text>Nah, this isn't it!!!</Text>
                    <Text>HAHAHAHAHAHAHHAAHAHAHAHAHAHAHAHAAHAHHAHAHAHAHAHAHAHAHAHA</Text>
                </Flex>
            </Flex>
            </ModalBody>
        </ModalContent>
        </Modal>
    </div>
  )
}
