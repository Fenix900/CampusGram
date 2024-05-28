import { Box, Flex, Image, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'
import notificationIcon from "../Assets/notification.png"

const Notifications = () => {
  return (
    <Tooltip hasArrow label={"Notification"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" }}>
        <Link 
        display={"flex"}
        to={"/"}
        as={ReactRouterLink}
        alignItems={"center"}
        gap={5}
        _hover={{bg:"gray.700"}}
        borderRadius={6}
        p={2}
        w={"full"}
        justifyContent={{base:"center", md:"flex-start"}}
        >
            <Flex
            alignItems={"center"}
            gap={5}
            _hover={{bg:"gray.700"}}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{base:"center", md:"flex-start"}}
            mt={"auto"}
            >
            <Image src={notificationIcon} width={'50px'} />
            <Box display={{base:"none", md:"block"}}>Notification</Box>
          </Flex>
        </Link> 
    </Tooltip> 
  )
}

export default Notifications