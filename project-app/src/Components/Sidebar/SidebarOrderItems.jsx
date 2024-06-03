import React from 'react'
import Home from '../Home/Home'
import HomeSidebar from './HomeSidebar'
import Search from './Search'
import Notification from './Notifications'
import CreatePost from './CreatePost'
import ProfileLink from './ProfileLink'
import { Flex } from '@chakra-ui/react'

const SidebarOrderItems = () => {
  return (
    <>
        <HomeSidebar />
        <Search />
        <CreatePost />
        <ProfileLink />
    </>
  )
}

export default SidebarOrderItems