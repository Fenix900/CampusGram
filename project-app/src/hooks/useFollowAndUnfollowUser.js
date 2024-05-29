import { useEffect, useState } from 'react'
import useAuthStore from '../globalStates/authStore'
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore"
import { firestore } from '../Firebase/firebase'
import { useDisplayError } from './useDisplayError'
import useProfileInfoStore from '../globalStates/profileInfoStore'

const useFollowAndUnfollowUser = (userID) => { //userID is the user we want to follow/unfollow
    const [isLoading, setIsLoading] = useState(false)
    const [isFollowing, setIsFollowing]  = useState(false)
    const signedInUser = useAuthStore((state) => state.user)
    const setSignedInUser = useAuthStore((state) => state.setUser)
    const {userProfileInfo, setUserProfileInfo} = useProfileInfoStore()
    const showMessage = useDisplayError();
    useEffect(() => { //Checks when userID or signedInUser changes and then checks if we follow "userID" or not from the "signedInUser" profile
        if(signedInUser){
            const isFollowingUser = signedInUser.following.includes(userID) //isFollowingUser is true if "following" contains the user
            setIsFollowing(isFollowingUser) //Set the isFollowing if we follow userID or not
        }
    },[userID, signedInUser])

    const handleFollowOrUnfollowUser = async () => {
        setIsLoading(true)
        if(signedInUser.userID === userID){
            console.log("This should not be possible, follow yourself so to say. Just a extra safety step i guess")
            return
        }
        try {
            const currectUserDocRef = doc(firestore, "users", signedInUser.userID);
            const otherUserDocRef = doc(firestore, "users", userID);
            //These two updates the document online (the could) so that users are removed from following and followed in both users
            await updateDoc(currectUserDocRef, {following:isFollowing ? arrayRemove(userID) : arrayUnion(userID)}); //Update document for logged in user with userID, we add userID as a follower
            await updateDoc(otherUserDocRef, {followers:isFollowing ? arrayRemove(signedInUser.userID) : arrayUnion(signedInUser.userID)})
            if(isFollowing){ //Unfollow the user
                //My hook
                setSignedInUser({   //Removes the following user from our profile (signed in profile), from global hook
                    ...signedInUser,
                    following: signedInUser.following.filter(id => id !== userID)
                })
                //Me locally
                localStorage.setItem("userProfile", JSON.stringify({ //Removes the following from our profile, but this is locally so we dont have to fetch it
                    ...signedInUser,
                    following: signedInUser.following.filter(id => id !== userID)
                }))
                //Other user
                if(userProfileInfo.usernameLower !== signedInUser.usernameLower){ //If we are on someone else profile and follow them
                setUserProfileInfo({    //Removes the followers from other persons profile (We remove ourself from anothers followers)
                    ...userProfileInfo,
                    followers: userProfileInfo.followers.filter(id => id !== signedInUser.userID)
                })}
                else{//This runs when we are on our own profile and follow someone through like the search function, which will update our own profile
                    setUserProfileInfo({    //Removes the followers from other persons profile (We remove ourself from anothers followers)
                        ...userProfileInfo,
                        following: userProfileInfo.following.filter(id => id !== userID)
                    })
                }
                setIsFollowing(false)
            }
            else{   //Follow user
                //My hook
                setSignedInUser({
                    ...signedInUser,
                    following: [...signedInUser.following, userID] //Adds "userID" into array "signedInUser.following", we add user to our following array
                })
                //Me locally
                localStorage.setItem("userProfile",JSON.stringify({ //We add userID to our following, but this is locally
                    ...signedInUser,
                    following: [...signedInUser.following, userID]
                }))
                //Other user
                if(userProfileInfo.usernameLower !== signedInUser.usernameLower){
                setUserProfileInfo({    //Adds our profile to other users followers
                    ...userProfileInfo,
                    followers: [...userProfileInfo.followers, signedInUser.userID]
                })}
                else{ //When we are on our own profile and follow someone thorugh like the search function
                    setUserProfileInfo({   //If we are on our own profile and follow someone we want to update our profile
                        ...userProfileInfo,
                        following: [...userProfileInfo.following, userID]
                    })
                }
                setIsFollowing(true)
            }
            setIsLoading(false)
        } catch (error) {
            showMessage("Error",error.message,"error")
            setIsLoading(false)
        }
    }
    return {isFollowing,handleFollowOrUnfollowUser,isLoading}
}

export default useFollowAndUnfollowUser