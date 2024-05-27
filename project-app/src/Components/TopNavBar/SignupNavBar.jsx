import { Box, Button, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignupNavBar = () => {
  return (
   <Flex justifyContent={"center"} w={"full"} bg={"cyan.800"}>
      <Box my={4}>
        <Flex flexDirection={"row"} alignItems={"center"} gap={3}>
          <Text color={"blue.200"}>Don't have an acount?</Text>
          <Link to='/'>
            <Button size={"sm"} bg={"gray.600"}>
              <Text color={"blue.200"} fontWeight={800}>Signup here</Text>
            </Button>
          </Link>
        </Flex>
        </Box>
   </Flex>
  )
}

export default SignupNavBar