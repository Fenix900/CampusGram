import { useEffect, useState } from 'react'
import { useDisplayError } from './useDisplayError'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';
import useProfileInfoStore from '../globalStates/profileInfoStore'

//This function gets the profile of a user by their username
const useGetProfileByName = (usernameLower) => {
    const [isLoading, setIsLoading] = useState(true); 
    const showMessage = useDisplayError();
    //Global hook to store users profile information
    const {userProfileInfo, setUserProfileInfo} = useProfileInfoStore();

    useEffect(() => {
        setIsLoading(true);
        const getUserProfile = async () =>{
            try {
                //query for user and find the document for that user (we search by lowecase names)
                const q = query(collection(firestore,"users"),where("usernameLower", "==", usernameLower))
                const documentSnapshot = await getDocs(q)

                //User isn't found, (cant fetch data about them)
                if(documentSnapshot.empty){
                    setIsLoading(false); 
                    setUserProfileInfo(null);
                    return
                }
                let userDoc; //Variable to save user document information in
                //This will return one user but the format is in array (thats why we have forEach)
                documentSnapshot.forEach((doc) => {
                    userDoc = doc.data();
                  });
                setUserProfileInfo(userDoc);//set the users profile information in the global hook
                setIsLoading(false);
            } catch (e) {
                showMessage("Error",e,"error")
                setIsLoading(false);
            }
        }
        getUserProfile()
    },[setUserProfileInfo, usernameLower])
    return{isLoading,userProfileInfo}
}


export default useGetProfileByName