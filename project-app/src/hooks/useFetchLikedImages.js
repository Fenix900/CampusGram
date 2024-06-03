import React, { useEffect, useState } from 'react'
import useProfileInfoStore from '../globalStates/profileInfoStore';
import { useDisplayError } from './useDisplayError';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';

const useFetchLikedImages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {userProfileInfo} = useProfileInfoStore()
    const [likedPosts, setLikedPosts] = useState([])
    const showMessage = useDisplayError()
    useEffect(() =>{
        const fetchLikedImages = async () => {
            if(isLoading) return //Don't run this again if it is loading
            setIsLoading(true)
            try {
                if (!userProfileInfo) {
                    setIsLoading(false);
                    showMessage("Something went wrong","No user found","error")
                    return; // Exit if there isn't a user profile
                }
                // Query to fetch liked images for the specific user
                const collectionRef = collection(firestore, 'posts'); //What collection
                const q = query(collectionRef,where('likes', 'array-contains', userProfileInfo.userID));  //We get all the posts where their likes conatins the userID
                const querySnapshot = await getDocs(q); // Get the documents
                const likedPostsArray = [];
                querySnapshot.forEach((doc) => { //Get all the data into likedPosts array
                    likedPostsArray.push({ id: doc.id, ...doc.data() });
                });
                likedPostsArray.sort((a, b) => b.createdTime - a.createdTime); // Sort by date
                setLikedPosts(likedPostsArray)

            } catch (error) {
                showMessage("Error",error.message,"error")
            }finally{
                setIsLoading(false)
            }
        }
        fetchLikedImages();
    },[userProfileInfo])
    return {isLoading, likedPosts}
}

export default useFetchLikedImages