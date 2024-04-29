import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar';

const PageLayout = ({children}) => {
     const {pathname} = useLocation();
  return (
    <Flex>
        {/*This side is for the side bar (LEFT) */}
        {pathname !== '/' ? (        
        <Box w={{base:"75px", md:"230px"}}> 
            <Sidebar/>
        </Box>
        ): null}
        {/*This side is for the page (RIGHT) */}
        <Box  flex={1} w={{base:"calc(100%-70px)", md:"calc(100%-200px)"}}>
            {children}
        </Box>
    </Flex>
    )
}

export default PageLayout