import React from 'react'
import { Button, Text } from '@chakra-ui/react' //Just for testing the text
import PageLayout from '../Sidebar/PageLayout'


export default function Home() {
  return (
    <div>
        <div>
            <Text fontSize='6xl'>This should be the home page</Text>
        </div>
        <Button size='lg'>HIIII</Button>
    </div>
  )
}
