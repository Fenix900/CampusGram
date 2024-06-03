import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { Login_Signup } from '../Login_Signup/Login_Signup'
import { ProfileAllPosts } from './ProfileAllPosts'
import LikedImages from './LikedImages'

export const ProfileSections = () => {
  return (
    <div>
        <Flex w={"full"}>
            <Tabs w={"full"}>
                <TabList justifyContent={"center"} gap={{base:2, md:12}}>
                    <Tab>My posts</Tab>
                    <Tab>Liked</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ProfileAllPosts />
                    </TabPanel>
                    <TabPanel>
                        <LikedImages />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    </div>
  )
}
