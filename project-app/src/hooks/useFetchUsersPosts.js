import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';
import useProfileInfoStore from '../globalStates/profileInfoStore';
import usePostsStore from '../globalStates/postsStore';

const useFetchUsersPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {posts, setPosts} = usePostsStore();
  const { userProfileInfo } = useProfileInfoStore();

  useEffect(() => {
    const fetchUsersPosts = async () => {
      setIsLoading(true);
      try {
        if (!userProfileInfo){
            setIsLoading(false)
            return; // Exit if there isn't a user profile
        }
        const q = query( //Gets the query for all the posts by a specific user by using the variable in documents "createByUser" which is the userID from who created the post
          collection(firestore, 'posts'),
          where('createByUser', '==', userProfileInfo.userID)
        );
        const querySnapshot = await getDocs(q); //Gets the documents
        const posts = [];
        querySnapshot.forEach((doc) => { //Fills the "posts" with users and its data
          posts.push({ id: doc.id, ...doc.data() });
        });
        posts.sort((a,b) => b.createdTime - a.createdTime); //sort by date
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersPosts();

  }, [userProfileInfo]);

  return { isLoading, posts };
};

export default useFetchUsersPosts;
