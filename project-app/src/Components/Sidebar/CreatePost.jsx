import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import postIcon from "../Assets/createPost.png"
import usePostsStore from '../../globalStates/postsStore'
import useAuthStore from '../../globalStates/authStore'
import useProfileInfoStore from '../../globalStates/profileInfoStore'
import { useDisplayError } from '../../hooks/useDisplayError'
import {firestore, storage} from "../../Firebase/firebase"
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure() //Handle modal
  const [descriptionText, setDescriptionText] = useState("") //State for the descritopn
  const [picture, setPicture] = useState(null); //State to store the picture
  const {isLoading, handleCreatePost} = useCreatePost();
  const showMessage = useDisplayError();

  const handleClose = () => { //reset values when we close the pop-up
    setDescriptionText("")
    setPicture(null)
    onClose()
  }
  const handleImageUpload = (event) => { //Copied from edit profile
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    else{
      //showMessage("Whopsi","Something went wrong","error")
      console.log("ERROR")
    }
  };

  const handleCreatePostFunction = async () => { //Call this function when updating 
    try {
      await handleCreatePost(picture, descriptionText);
      handleClose()
    } catch (error) {
      showMessage("Error",error.message,"error")
    }
  }

  return (
    <>
    <Tooltip hasArrow label={"Create post"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" }}>
          <Flex
          alignItems={"center"}
          gap={5}
          _hover={{bg:"gray.700"}}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{base:"center", md:"flex-start"}}
          mt={"auto"}
          onClick={onOpen}
          >
            <Image src={postIcon} width={'50px'} />
            <Box display={{base:"none", md:"block"}}>Create post</Box>
          </Flex>
    </Tooltip>
    <Modal isOpen={isOpen} onClose={handleClose}> {/* modal to upload image with description */}
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Create a post</ModalHeader>
      <ModalCloseButton />
      <ModalBody pt={"20px"}>
        <Box maxW="md" mx="auto">
          <Flex gap={10} flexDirection={"column"} align="center">
            <FormControl id="description" fontWeight={600}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Enter a description" 
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}/>
            </FormControl>
            <Input type='file' accept="image/*" py={"20px"} h={"full"} variant="unstyled" _placeholder={{ opacity: 1, color: 'gray.500' }} onChange={handleImageUpload}/>
            {picture && (
                  <Box mt={2} w="300px" h="300px" overflow="hidden"> {/*Displayes a image if we have uploaded one */}
                    <Image
                        src={picture}
                        alt="Profile Preview"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="center"
                    />
                  </Box>
              )}
          </Flex>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Flex justifyContent="space-between" w={"full"}>
          <Button colorScheme='blue' mr={3} onClick={handleClose} isLoading={isLoading}>
            <Text>Close</Text>
          </Button>
          <Button colorScheme='blue' mr={3} onClick={handleCreatePostFunction} isLoading={isLoading}>
            <Text>Post</Text>
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </>
  )
}

function useCreatePost() { //hook to create a post
  const [isLoading, setIsLoading] = useState(false);
  const {createPost} = usePostsStore();
  const loggedInUser = useAuthStore((state) => state.user);
  const {addPost,userProfileInfo} = useProfileInfoStore(); 
  const showMessage = useDisplayError();

  const handleCreatePost = async(picture, descriptionText) =>{
    setIsLoading(true)
    if(!picture){ //If no image is uploaded
      setIsLoading(false)
      throw new Error('No image selected');
    }
    const newPost = { //This is a post, what it should contain 
      descText: descriptionText,
      likes: [],
      comments: [],
      createdTime: Date.now(),
      createByUser: loggedInUser.userID
    }
    try {
      const postDoc = await addDoc(collection(firestore,"posts"),newPost); //Adds document to store the new image information in directory "posts"
      const userDoc = doc(firestore,"users",loggedInUser.userID); //Gets the document for the user that is signed in
      const imageRef = ref(storage, "posts/"+postDoc.id)  // The reference to where the image will be stored in Firebase Storage
      //await updateDoc(userDoc, {posts:arrayUnion(postDoc.id)}); //Adds the new posts id to the users posts array so we can track them up later
      await uploadString(imageRef, picture, "data_url"); //here we upload the image "picture" at the "imageRef" position on firebase storage (but as string)
      const downloadURL = await getDownloadURL(imageRef); //Here we get the url for the image that we just uploaded
      await updateDoc(postDoc, {imageURL:downloadURL}); //Here we update the postDoc (on cloud) which is the document where we save the info about the image, 
                                                                      ///and we add the downloadURL to it which is a new variable in this document
      // Update the local newPost object with the image URL and ID
      newPost.imageURL = downloadURL;
      newPost.id = postDoc.id;
      // Update the user document to include the new post ID (on the cloud)
      await updateDoc(userDoc, { posts: arrayUnion(postDoc.id) });
      
      // Update the local state and stores
      if(userProfileInfo && userProfileInfo.userID === loggedInUser.userID){//We just want to update the profile if we are on our own
        createPost(newPost);
        addPost(newPost);
      }
      showMessage("Post created","Posted successfully","success");
    } catch (error) {
      console.log(error)
      showMessage("Error",error.message,"error")
    }finally{
      setIsLoading(false)
    }
  }
  return {isLoading, handleCreatePost}
}

export default CreatePost