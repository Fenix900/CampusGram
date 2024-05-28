import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Link as ReactRouterLink} from 'react-router-dom'
import searchIcon from "../Assets/search.png"
import useSearchForUser from '../../hooks/useSearchForUser'
import { SuggestedUser } from '../suggestionForUsers/SuggestedUser'
import useAuthStore from '../../globalStates/authStore'

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState('');
  const {isLoading, users, searchUser, clearUsers} = useSearchForUser();
  const loggedInUser = useAuthStore(state => state.user)
  const navigate = useNavigate() //If we want to navigate to the user profile when we press their profile (might implment later)

  const handleClose = () => { //We handle the close buttons
    onClose() //Close the pop-up
    setUsername('') //Clear the search input
    clearUsers()  //Clear the found users
  }
  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(username);
  }

  return (
    <>
      <Tooltip hasArrow label={"Search"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" }}>
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
              <Image src={searchIcon} width={'50px'} />
              <Box display={{base:"none", md:"block"}}>Search</Box>
            </Flex>
      </Tooltip> 
      {/*Modal overlay that shows up when we want to search for a user */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent h={"70%"} maxH={"90%"}>
          <ModalCloseButton />
          <ModalBody pt={"50px"}>
            <form onSubmit={handleSearch}>
            <FormControl>
              <FormLabel fontSize={"lg"}>Search by username</FormLabel>
              <InputGroup size='sm'>
                <Input
                  type='text'
                  placeholder='Username'
                  _placeholder={{ color: "gray" }}
                  value={username} // Bind state to input value
                  onChange={(e) => {setUsername(e.target.value)}} //Saves the change in username
                />
                {/* This is the button to the left of the search field */}
                <InputRightAddon bg={"transparent"} border={"none"}>
                  <Button w={"full"} h={"full"} isLoading={isLoading} onClick={handleSearch}>                  
                    Search
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            </form>
            <Flex flexDirection={"column"}>
            {users .filter(user => user.usernameLower !== loggedInUser.usernameLower).map(user => ( //Show users that isn't the logged in on
                <Flex key={user.userID} p={2} alignItems="center">
                  <SuggestedUser user={user}/>  {/* Show the user with the suggested user component */}
                </Flex>
              ))
            }
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"} pt={"30px"}>
            <Button colorScheme='blue' onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search