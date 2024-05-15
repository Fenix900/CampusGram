import { Flex, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

export const ProfileSinglePost = ({img}) => {
  return (
    <div>
        <GridItem cursor={"pointer"} borderRadius={6} aspectRatio={1/1} position={"relative"}>
            <Flex 
            flexDirection={{base:"column",md:"row"}}
            opacity={0} 
            _hover={{opacity:0.7}} 
            bg={"black"} 
            transition={"all 0.7 ease"} 
            justifyContent={"center"} 
            h={"full"} 
            w={"full"} 
            position={"absolute"}
            gap={{base:0,sm:3, md:6}}
            alignItems={"center"}>
                <Flex flexDirection="column" textAlign="center" fontSize={{sm:"md", base:"xs", lg:"xl"}}>
                    <Text fontWeight={"700"}>Likes</Text> 
                    20
                </Flex>
                <Flex flexDirection="column" textAlign="center" fontSize={{sm:"md", base:"xs", lg:"xl"}}>
                    <Text fontWeight={"700"}>comments</Text>    {/*Replace this and likes with icons */}
                    5
                </Flex>
            </Flex> 
            <Image src={img} h={"100%"} w={"100%"} objectFit={"cover"}/>
        </GridItem>
    </div>
  )
}
