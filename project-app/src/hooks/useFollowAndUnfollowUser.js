import { useEffect, useState } from 'react'
import useAuthStore from '../globalStates/authStore'
import {doc, updateDoc} from "firebase/firestore"
import { firestore } from '../Firebase/firebase'

const useFollowAndUnfollowUser = (userID) => {
    const [isFollowing, setIsFollowing]  = useState(false)
    const signedInUser = useAuthStore((state) => state.user)
    const setSignedInUser = useAuthStore((state) => state.setUser)
    
    if(signedInUser.userID === userID){
        console.log("Cannot follow yourslef")
        return
    }

    useEffect(() => {
        if(signedInUser){
            const isFollowingUser = signedInUser.following.includes(userID) //isFollowingUser is true if "following" contains the user
            setIsFollowing(trisFollowingUserue) //Set the isFollowing if we follow userID or not
        }
    },[userID, signedInUser])

    const handleFollowOrUnfollowUserf = async () => {
        try {
            const currectUserDocRef = doc(firestore, "users", signedInUser.userID);
            console.log(currectUserDocRef)
            await updateDoc(currectUserDocRef, {following:arrayUnion(userID)}); //Update document for logged in user with userID, we add userID as a follower
        } catch (error) {
            console.log(error)
        }
    }
    return {isFollowing}
}

export default useFollowAndUnfollowUser