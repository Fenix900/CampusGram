import { Container } from '@chakra-ui/react'
import { OnePost } from './OnePost'
import TestPost1 from "../Assets/LIS_Test.png"
import TestPost2 from "../Assets/mc.png"
import profPIC from "../Assets/username.png"

//The overall posts, this will show all the posts with each post as <OnePost>

export const FeedPosts = () => {
  return (
    <Container maxW={"continer.sm"} py={10} px={2}>
         <OnePost postedImg={TestPost1} username="Filip Kayar" profilePic={profPIC}/>
         <OnePost postedImg={TestPost2} username="Samir Haddad" profilePic=""/>
         <OnePost postedImg="" username="Fanny Eriksson" profilePic=""/>
         <OnePost postedImg="" username="David Karabas" profilePic={profPIC}/>
    </Container>
  )
}
