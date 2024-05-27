import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { Login_Signup } from '../Login_Signup/Login_Signup'

export const ProfileSections = () => {
  return (
    <div>
        <Flex w={"full"}>
            <Tabs w={"full"}>
                <TabList justifyContent={"center"} gap={{base:2, md:12}}>
                    <Tab>My posts</Tab>
                    <Tab>Liked</Tab>
                    <Tab>Saved</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        Show my posts here
                    </TabPanel>
                    <TabPanel>
                        Show the liked images here
                    </TabPanel>
                    <TabPanel>
                        Show the saved images here
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    </div>
  )
}
