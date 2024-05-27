import { useEffect, useState } from 'react'
import useAuthStore from '../globalStates/authStore'
import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore"
import { firestore } from '../Firebase/firebase'

const useFollowAndUnfollowUser = (userID) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isFollowing, setIsFollowing]  = useState(false)
    const signedInUser = useAuthStore((state) => state.user)
    const setSignedInUser = useAuthStore((state) => state.setUser)

    useEffect(() => {
        if(signedInUser){
            const isFollowingUser = signedInUser.following.includes(userID) //isFollowingUser is true if "following" contains the user
            setIsFollowing(isFollowingUser) //Set the isFollowing if we follow userID or not
        }
    },[userID, signedInUser])

    const handleFollowOrUnfollowUser = async () => {
        setIsLoading(true)
        if(signedInUser.userID === userID){
            console.log("Cannot follow yourslef")
            return
        }
        try {
            const currectUserDocRef = doc(firestore, "users", signedInUser.userID);
            await updateDoc(currectUserDocRef, {following:isFollowing ? arrayRemove(userID) : arrayUnion(userID)}); //Update document for logged in user with userID, we add userID as a follower
            if(isFollowing){ //Unfollow the user
                setSignedInUser({
                    ...signedInUser,
                    following: signedInUser.following.filter(uid => uid !== userID)
                })
                localStorage.setItem("userProfile", JSON.stringify({
                    ...signedInUser,
                    following: signedInUser.following.filter(uid => uid !== userID)
                }))
                setIsFollowing(false)
            }
            else{   //Follow user
                setSignedInUser({
                    ...signedInUser,
                    following: [...signedInUser.following, userID] //Adds "userID" into array "signedInUser.following"
                })
                localStorage.setItem("userProfile",JSON.stringify({
                    ...signedInUser,
                    following: [...signedInUser.following, userID]
                }))
                setIsFollowing(true)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    return {isFollowing,handleFollowOrUnfollowUser,isLoading}
}

export default useFollowAndUnfollowUser