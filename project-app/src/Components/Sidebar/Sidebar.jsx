import { Avatar, Box, Flex, Image, Link, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import {Link as ReactRouterLink} from 'react-router-dom'
import TestICON from "../Assets/Email.png"
import signOut from "../Assets/logout.png"

//This is the side bar that is being imported to the layout
const Sidebar = () => {
    //These are the sidebar icons and what they are
    const sidebarItems = [
        {
            icon: <Image src={TestICON} width={'50px'} />,
            text: "Home",
            link: "/home",
        },
        {
            icon: <Image src={TestICON} width={'50px'} />,
            text: "Search",
            link: "/home",
        },
        {
            icon: <Image src={TestICON} width={'50px'} />,
            text: "Notifications",
            link: "/home",
        },
        {
            icon: <Avatar size={{ base: "sm", md: "md" }} name='Filip' src='https://bit.ly/broken-link' />,
            text: "Profile",
            link: "/home",
        },
    ];
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
                    {sidebarItems.map((item,index)=>( 
                         <Tooltip key={index} hasArrow  label={item.text} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" /* Maybe none for md*/}}>
                             <Link 
                             display={"flex"}
                             to={item.link || null}
                             as={ReactRouterLink}
                             alignItems={"center"}
                             gap={5}
                             _hover={{bg:"gray.700"}}
                             borderRadius={6}
                             p={2}
                             w={"full"}
                             justifyContent={{base:"center", md:"flex-start"}}
                             >
                                {item.icon}
                                <Box display={{base:"none", md:"block"}}>{item.text}</Box>
                             </Link> 
                         </Tooltip> 
                    ))}
                </Flex>
                {/*signout icon*/}
                <Tooltip hasArrow  label={"Logout"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block"}}>
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
                        mt={"auto"}
                        >
                        <Image src={signOut} boxSize={{base:"40px",md:"60px"}}></Image>
                        <Box display={{base:"none", md:"block"}}>{"Logout"}</Box>
                    </Link> 
                </Tooltip> 
            </Flex>
        </Box>
    )
}

export default Sidebar