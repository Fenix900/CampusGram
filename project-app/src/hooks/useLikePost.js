import { useState } from 'react'
import useAuthStore from '../globalStates/authStore';
import { useDisplayError } from './useDisplayError';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';
import usePostsStore from '../globalStates/postsStore';

const useLikePost = (post) => { //This hook will handle the like functionallity of a post
    const [isUpdating, setIsUpdating] = useState(false);
    const loggedInUser = useAuthStore(state => state.user)
    const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(post.likes.includes(loggedInUser?.userID))
    const showMessage = useDisplayError()
    const { setLikes, removeLikedPost, addLikedPost } = usePostsStore();

    const handleLike = async() => {
        if(isUpdating){return}
        setIsUpdating(true)
        if(!loggedInUser){
            showMessage("Not signed in","Need to sign in to like posts","error")
            setIsUpdating(false)
            return
        }

        try {
            const postRef = doc(firestore,"posts",post.id)
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(loggedInUser.userID) : arrayUnion(loggedInUser.userID)
            })
            setIsLiked(!isLiked);
            isLiked ? setNumberOfLikes(numberOfLikes-1) : setNumberOfLikes(numberOfLikes+1)
            setLikes(post.id, loggedInUser.userID);
            //handle liked images for liked-tab
            if (isLiked) { //Have we liked an image we want to remove it from our poststore
                removeLikedPost(post.id);
            } else { //Add a liked image
                addLikedPost(post);
            }
        } catch (error) {
            showMessage("Error",error.message,"error")
        }finally{
            setIsUpdating(false)
        }
    }
    return {isUpdating, numberOfLikes, isLiked, handleLike}
}

export default useLikePost