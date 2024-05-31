import { useState, useEffect } from 'react';
import { firestore } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useFetchUserInfoByUserID = (userID) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { //Function to fetch user profile by using userID from the inputs
    const fetchuser = async () => {
      setIsLoading(true);
      setUser(null)
      try {
        const userDocRef = doc(firestore, 'users', userID); //Ref to users doc
        const userDoc = await getDoc(userDocRef); //Fetch the users document
        if (userDoc.exists()) {
            setUser(userDoc.data())
        } else {
            console.log(`No user found with ID: ${userID}`);
        }
      } catch (error) {
        console.log("COULD NOT GET USER BY ID WITH ERROR:", error)
      } finally {
        setIsLoading(false);
      }
    };

    if (userID.length > 0) {
      fetchuser();
    }
  }, [userID]);

  return {user, isLoading};
};

export default useFetchUserInfoByUserID;
