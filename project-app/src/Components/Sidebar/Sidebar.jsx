import { Avatar, Box, Center, Flex, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'
import {Link as ReactRouterLink} from 'react-router-dom'
import TestICON from "../Assets/Email.png"

//This is the side bar that is being imported to the layout
const Sidebar = () => {
    //These are the sidebar icons and what they are
    const sidebarItems = [
        {
            icon: <img src={TestICON} width={'50px'}/>,
            text: "Home",
            link: "/home",
        },
        {
            icon: <img src={TestICON} width={'50px'}/>,
            text: "Search",
            link: "/home",
        },
        {
            icon: <img src={TestICON} width={'50px'}/>,
            text: "Notifications",
            link: "/home",
        },
        {
            icon: <Avatar size={"sm"} name='Filip' src='https://bit.ly/broken-link'/>,
            text: "Profile",
            link: "/",
        },
    ];
    return (
        <Box
        height={"100%"}
        borderRight={"1px solid"}
        borderColor={"whitesmoke.500"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{base:2,md:4}}>
            <Flex direction={'column'} gap={20}  w={"full"} height={"full"}>
                <Link as={ReactRouterLink} to={'/home'} pl={2} display={{base:"none", md:"block"}} _hover={{bg:"gray.700"}}>
                    <div>Home ICON</div>
                </Link>
                <Link as={ReactRouterLink} to={'/home'} pl={2} display={{base:"block", md:"none"}} _hover={{bg:"gray.700"}}>
                    <div>On phone ICON</div>
                </Link>

                <Flex direction={"column"} gap={5} cursor={"pointer "}>
                    {sidebarItems.map((item,index)=>( 
                         <Tooltip key={index } hasArrow  label={item.text} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" /* Maybe none for md*/}}>
                             <Link 
                             display={"flex"}
                             to={item.link || null}
                             as={ReactRouterLink}
                             alignItems={"center"}
                             gap={5}
                             _hover={{bg:"white.100"}}
                             borderRadius={6}
                             p={2}
                             w={"full"}
                             >
                                {item.icon}
                                <Box display={{base:"none", md:"block"}}>{item.text}</Box>
                             </Link> 
                         </Tooltip> 
                    ))}
                </Flex>
            </Flex>
        </Box>
    )
}

export default Sidebar