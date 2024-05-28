import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';
import useAuthStore from '../globalStates/authStore';
import useProfileInfoStore from '../globalStates/profileInfoStore';

const useFetchUsersPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const { userProfileInfo } = useProfileInfoStore();
  const loggedInUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchUsersPosts = async () => {
      setIsLoading(true);
      try {
        if (!userProfileInfo){
            setIsLoading(false)
            return; // Exit if there isn't a user profile
        }
        const q = query(
          collection(firestore, 'posts'),
          where('createByUser', '==', userProfileInfo.userID)
        );
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersPosts();

    // Clean-up function
    return () => setUserPosts([]);
  }, [loggedInUser]);

  return { isLoading, userPosts };
};

export default useFetchUsersPosts;
