import { useEffect, useState } from 'react'
import usePostsStore from '../globalStates/postsStore'
import useAuthStore from '../globalStates/authStore'
import { useDisplayError } from './useDisplayError'
import { Firestore, collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/firebase'
import useProfileInfoStore from '../globalStates/profileInfoStore'

const useGetPosts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {posts, setPosts} = usePostsStore()
    const loggedInUser = useAuthStore(state => state.user)
    const showMessage = useDisplayError()
    const {setUserProfile} = useProfileInfoStore()

    useEffect(() =>{
        const fetchAllFeedPosts = async () =>{
            if(loggedInUser.following.length === 0){
                setPosts([])
                return
            }
            if(isLoading) return;
            setIsLoading(true)
            try {
                const postsRef = collection(firestore, "posts")
                const q = query(postsRef,where("createByUser","in",loggedInUser.following))
                const querySnapshot = await getDocs(q)
                const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                const postsDataSorted = postsData.sort((a,b) => a.createdTime - b.createdTime)
                setPosts(postsDataSorted)
            } catch (error) {
                showMessage("Error",error.message,"error")
            }finally{
                setIsLoading(false)
            }
        }
        if(loggedInUser){
            fetchAllFeedPosts();
        }
    },[loggedInUser, setPosts, isLoading,setUserProfile])
    return {posts, isLoading}
}

export default useGetPosts