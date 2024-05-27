import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import useAuthStore from '../globalStates/authStore';
import { firestore } from '../Firebase/firebase';
import { useDisplayError } from './useDisplayError';

const useFetchSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const signedInUser = useAuthStore(state => state.user);
  const showMessage = useDisplayError();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!signedInUser) { //We don't want to suggest users if we aren't signed in (Just a fail safe if somehting went wrong), users should not see this if they aren't signed in
        setIsLoading(false);
        return;
      }

      try {
        const usersCollection = collection(firestore, 'users'); //Gets the collection of all the users
        const userSnapshot = await getDocs(usersCollection);//Gets all the users documents
        const usersList = userSnapshot.docs.map(doc => ({   //We then map all the users document in an array with their corresponding id and data
          id: doc.id,
          ...doc.data()
        }));

        // Filter out the signed-in user and already followed users
        const filteredUsers = usersList.filter(user =>
          user.userID !== signedInUser.userID && !signedInUser.following.includes(user.userID)
        );

        // Take a random set of 5 users from the remaining
        const shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());
        const selectedUsers = shuffledUsers.slice(0, 5);

        setSuggestedUsers(selectedUsers);
      } catch (error) {
        showMessage("Error",error,"error")
        console.error("Error fetching users: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [signedInUser]);

  return { suggestedUsers, isLoading };
};

export default useFetchSuggestedUsers;
