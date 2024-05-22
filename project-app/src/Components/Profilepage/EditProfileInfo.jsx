
import { Avatar, AvatarBadge, Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import useAuthStore from '../../globalStates/authStore';
import { useDisplayError } from '../../hooks/useDisplayError';

const EditProfileInfo = ({isOpen, onClose}) => { //Change this so it is custom, with custome fields and so on
    const [profilePicture, setProfilePicture] = useState(null);  //Hook for when we change the profile picture
    const userInfo = useAuthStore((state) => state.user);     //Gets the user information
    const showMessage = useDisplayError();
    const [inputs, setInputs] = useState({
        username:'',
        displayText:'',
        description:''
    });
    //Add checker if the input is nothing MAYBE SHOULD ADD THIS
    //const isError = input === ''
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
      else{
        showMessage("Whopsi","Something went wrong","error")
      }
    };
    //This function should update the information
    const saveAndUpdateProfile = () =>{
        showMessage("Saved image","We saved your image","success")
    }
    

  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader w={"full"} textAlign="center">Edit profile</ModalHeader>
          <ModalCloseButton />
          {/*Things inside the pop-up */}
          <ModalBody>
            <Box maxW="md" mx="auto">
                <VStack spacing={4} align="stretch">
                    <FormControl id="username" isRequired>
                        <FormLabel fontWeight={600}>Username</FormLabel>
                        <Input type="text" placeholder="Enter your new username" _placeholder={{ opacity: 1, color: 'gray.500' }}
                        value={inputs.username || userInfo.username}
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}/>
                    </FormControl>
                    <FormControl id="displayName">
                        <FormLabel fontWeight={600}>Name to be displayed in profile</FormLabel>
                        <Input type="text" placeholder="Enter a display name or title" _placeholder={{ opacity: 1, color: 'gray.500' }}
                        value={inputs.displayText || userInfo.profileDisplayName}
                        onChange={(e) => setInputs({...inputs, displayText: e.target.value})}/>
                    </FormControl>
                    <FormControl id="description" fontWeight={600}>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder="Enter a description" 
                        value={inputs.description || userInfo.bio}
                        onChange={(e) => setInputs({...inputs, description: e.target.value})}/>
                    </FormControl>
                    {/*Here we take the profile picture input */}
                    <FormControl id="profilePicture">
                        <Flex align="center" direction="column">
                            <FormLabel borderBottom={"solid gray"} w={"full"} textAlign="center" mb={5}>Upload profile picture</FormLabel>
                            <Input type="file" accept="image/*" onChange={handleImageUpload} variant="unstyled" _placeholder={{ opacity: 1, color: 'gray.500' }}/>
                            {profilePicture && (
                                <Box mt={2} maxW="200px" maxH="200px" overflow="hidden"> {/*Fix this so the image is different display sizes for phone/PC AND make the user be able to remove profilePIC*/}
                                <Image
                                    src={profilePicture}
                                    alt="Profile Preview"
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                                </Box>
                            )}
                        </Flex>
                    </FormControl>
                </VStack>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"space-around"}>
            <Button colorScheme='red' onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={saveAndUpdateProfile}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditProfileInfo