import { Avatar, Box, Flex, Image, Link, Spinner, Text, Toast, Tooltip } from '@chakra-ui/react'
import React from 'react'
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'
import TestICON from "../Assets/Email.png"
import signOut_icon from "../Assets/logout.png"
import {useSignOut} from "react-firebase-hooks/auth"
import { auth } from '../../Firebase/firebase';
import { useDisplayError } from '../../hooks/useDisplayError';
import useAuthStore from "../../globalStates/authStore"
import searchIcon from "../Assets/search.png"
import SidebarOrderItems from './SidebarOrderItems'

//This is the side bar that is being imported to the layout
const Sidebar = () => {
    const [signOut, loadilng_logout] = useSignOut(auth);
    const showMessage = useDisplayError();
    const UserLogOut = useAuthStore((state) => state.logout) //To sign out user (Remove user from local storage)
    const userInfo = useAuthStore((state) => state.user);    //Get user info (Fetch user information locally)
    const navigate = useNavigate()
    //This function handles logouts
    const logOutUser = async () => {
        try {
            navigate('/home')
            await signOut();
            localStorage.removeItem('userProfile') 
            showMessage("Logged out","Bye","warning")
            UserLogOut();
            navigate('/')
        } catch (error) {
            showMessage("Error",error.message,"error")
        }
    }
    return (
        <Box
        height={"100vh"}
        borderRight={"1px solid"}
        borderColor={"whitesmoke.500"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{base:2,md:4}}>
            <Flex direction={'column'} gap={20}  w={"full"} height={"full"}>
                <Link as={ReactRouterLink} to={'/home'} pl={2} display={{base:"none", md:"block"}} _hover={{bg:"gray.700"}}>
                    <div>
                        <Text fontSize={'29px'} as='kbd'>
                        CampusGram
                        </Text>
                    </div>
                </Link>
                <Link as={ReactRouterLink} to={'/home'} pl={2} display={{base:"block", md:"none"}} _hover={{bg:"gray.700"}}>
                    <div>
                    <Text fontSize={'29px'} as='kbd'>
                        CG
                    </Text>
                    </div>
                </Link>

                <Flex direction={"column"} gap={5} cursor={"pointer "}>
                    {/*Here we have all the sidebar items except the logout item */}
                    <SidebarOrderItems />
                </Flex>
                {/*signout icon*/}
                <Tooltip hasArrow  label={"Logout"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block"}}>
                    <Flex 
                        onClick={logOutUser}
                        alignItems={"center"}
                        gap={5}
                        _hover={{bg:"gray.700"}}
                        borderRadius={6}
                        p={2}
                        w={"full"}
                        justifyContent={{base:"center", md:"flex-start"}}
                        mt={"auto"}
                        cursor="pointer"
                        >
                        {//Shows a spinner if it is loading
                        loadilng_logout ? (<Spinner size="xl" />) : (<Image src={signOut_icon} boxSize={{base:"40px",md:"60px"}}></Image>)}
                        <Box display={{base:"none", md:"block"}}>{"Logout"}</Box>
                    </Flex> 
                </Tooltip> 
            </Flex>
        </Box>
    )
}

export default Sidebar