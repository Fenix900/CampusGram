import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'
import postIcon from "../Assets/createPost.png"
import usePostsStore from '../../globalStates/postsStore'
import useAuthStore from '../../globalStates/authStore'
import useProfileInfoStore from '../../globalStates/profileInfoStore'
import { useDisplayError } from '../../hooks/useDisplayError'
import {firestore, storage} from "../../Firebase/firebase"
import { addDoc, arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { async } from '@firebase/util'

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
    console.log(file.size)
    if (file.size > 848487) { //good enough value, because firebase complain
      showMessage("Error", "File is too large", "error");
      return; // Exit the function if file size is too large
    }
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
            Close
          </Button>
          <Button colorScheme='blue' mr={3} onClick={handleCreatePostFunction} isLoading={isLoading}>
            Post
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
  const addPost = useProfileInfoStore((state) => state.addPost); 
  const showMessage = useDisplayError();

  const handleCreatePost = async(picture, descriptionText) =>{
    setIsLoading(true)
    if(!picture){ //If no image is uploaded
      throw new Error('No image selected');
    }
    const newPost = { //This is a post, what it should contain 
      image: picture,
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
      await updateDoc(userDoc, {posts:arrayUnion(postDoc.id)}); //Adds the new posts id to the users posts array so we can track them up later
      await uploadString(imageRef, picture, "data_url"); //here we upload the image "picture" at the "imageRef" position on firebase storage (but as string)
      const downloadURL = await getDownloadURL(imageRef); //Here we get the url for the image that we uploaded
      await updateDoc(postDoc, {imageURL:downloadURL}); //Here we update the postDoc (on cloud) which is the document where we save the info about the image, and we add the downloadURL to it

      newPost.imageURL = downloadURL;  //We set the url on the newPost locally too
      createPost({...newPost, id:postDoc.id});
      addPost({...newPost, id:postDoc.id})

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