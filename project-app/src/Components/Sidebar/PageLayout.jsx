import { Box, Button, Flex, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebase';
import SignupNavBar from '../TopNavBar/SignupNavBar';
import useAuthStore from '../../globalStates/authStore';

const PageLayout = ({children}) => {
    const location = useLocation();
     //const [user, loading, error] = useAuthState(auth);
     const userInfo = useAuthStore((state) => state.user);  
     //This showsSidebar shows the sidabar if the location isn't the login page and if there is a signed in user
     const navSigninOrSignup =  !userInfo && location.pathname !=="/";
     const showSidebar = location.pathname !== "/" && userInfo;


  return (
    <VStack>
        {navSigninOrSignup ? <SignupNavBar /> : null}
        <Flex w={"full"}>
            {/*This side is for the side bar (LEFT) */}
            {showSidebar ? (        
            <Box w={{base:"75px", md:"230px"}}> 
                <Sidebar/>
            </Box>
            ): null}
            {/*This side is for the page (RIGHT) */}
            <Box  flex={1} w={{base:"calc(100%-70px)", md:"calc(100%-200px)"}}>
                {children}
            </Box>
        </Flex>
    </VStack>
    )
}

export default PageLayout