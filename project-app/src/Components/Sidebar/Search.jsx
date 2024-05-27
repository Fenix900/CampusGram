import { Box, Flex, Image, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Link as ReactRouterLink} from 'react-router-dom'
import searchIcon from "../Assets/search.png"

const Search = () => {
  return (
    <Tooltip hasArrow label={"Search"} placement='right' openDelay={300} ml={2} display={{md:"none", base:"block" }}>
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
            <Image src={searchIcon} width={'50px'} />
            <Box display={{base:"none", md:"block"}}>Search</Box>
          </Flex>
        </Link> 
    </Tooltip> 
  )
}

export default Search