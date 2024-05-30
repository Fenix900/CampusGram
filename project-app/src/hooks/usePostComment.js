import React, { useState } from 'react'
import { useDisplayError } from './useDisplayError'
import useAuthStore from '../globalStates/authStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase/firebase'
import usePostsStore from '../globalStates/postsStore'

const usePostComment = () => {
    const [isLoading, setIsLoading] = useState(false)
    const showMessage = useDisplayError()
    const loggedInUser = useAuthStore(state => state.user)
    const addComment = usePostsStore(state => state.addComment)

    const handlePostComment = async (comment, postID) => {
        if(!loggedInUser){ //Failsafe if the user is able to get here
            showMessage("Not logged in","Please sign in to comment","warning")
        }
        if(isLoading) {//Dont run if we already are trying to post comment
            showMessage("Wait","Posting comment","warning")
            return
        }
        setIsLoading(true);
        const newCreatedComment = {
            commentText: comment,
            createdDate: Date.now(),
            postedByID: loggedInUser.userID, 
            postID: postID
        };
        console.log(newCreatedComment)
        try {
            //add comment to the database, to the specific post
            const postRef = doc(firestore,"posts",postID) //postRef is the post from the database where the ID is the one we are on
            await updateDoc(postRef,{comments: arrayUnion(newCreatedComment)}) //adds the newCreatedComment to postRef (document)
            addComment(postID,newCreatedComment)

        } catch (error) {
            showMessage("Error",error.message,"error")
        } finally{
            setIsLoading(false)
        }
    }
    return {handlePostComment, isLoading}
}

export default usePostComment