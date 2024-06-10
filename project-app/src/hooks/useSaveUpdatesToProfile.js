import { useState } from 'react'
import { firestore, storage } from '../Firebase/firebase'
import useAuthStore from '../globalStates/authStore';
import { useDisplayError } from '../hooks/useDisplayError';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import useProfileInfoStore from '../globalStates/profileInfoStore';

const useSaveUpdatesToProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    //Gets the user info locally
    const userInfo = useAuthStore((state) => state.user);
    const setUserInfo = useAuthStore((state) => state.setUser);
    const showMessage = useDisplayError();
    const setUsersProfileInfo = useProfileInfoStore((state) => state.setUserProfileInfo)

    //Function to update information about the user
    const updateProfileInfo = async (inputs, uploadedProfilePic, onClose) => {

        //To check if the user pushed the button again while uploading
        if(isUpdating){
            showMessage("Pleas wait", "Uploading...","warning")
            return
        }
        
        //Start uploading
        setIsUpdating(true);
        //reference to database for profilepics (storage)
        const storageRef = ref(storage, "usersProfilePics/"+userInfo.userID);
        //document to update the user info
        const docRef = doc(firestore, "users", userInfo.userID);

        let imageURL = "";
        try {
            if(uploadedProfilePic){
                await uploadString(storageRef, uploadedProfilePic, 'data_url'); //upload image
                imageURL = await getDownloadURL(storageRef); //Get uploaded image
            }
            // Check if the new usernameLower already exists
            const newUsernameLower = inputs.username.toLowerCase();
            const usernameQuery = query(collection(firestore, "users"), where("usernameLower", "==", newUsernameLower));
            const querySnapshot = await getDocs(usernameQuery);
            if(!querySnapshot.empty){
                showMessage("Whopsi","This username is already in use","error")
                throw new Error("User document does not exist");
            }

            // Fetch the existing user document from Firestore
            const existingDoc = await getDoc(docRef);
            if (!existingDoc.exists()) {
                throw new Error("User document does not exist");
            }
            const existingData = existingDoc.data();

            const newUserInfo = { //New user information to be updated
                username: inputs.username || existingData.username,
                profileDisplayName: inputs.displayText || existingData.profileDisplayName,
                bio: inputs.description || existingData.bio,
                profilePicture: imageURL || existingData.profilePicture,
                usernameLower: inputs.username.toLowerCase() || existingData.usernameLower 
            }
            // Merge existing data with new user info
            const updatedUserInfo = {
                ...existingData,
                ...newUserInfo
            };

            //We update the user information document "docRef" with "updatedUserInfo"
            await updateDoc(docRef, updatedUserInfo)
            //This updates the local information without having to refetch the information or sign-out&in
            localStorage.setItem("userProfile", JSON.stringify(updatedUserInfo));
            setUserInfo(updatedUserInfo);  //Update the local information about the user itself
            setUsersProfileInfo(updatedUserInfo);   //We also want to update the user info to display since we are in the profile page
            //--------------
            //Ad updater so profile updates when Save is hit. Now it doesn't update the profile and no fetch to the data base is done ---------
            console.log("The user information", userInfo) //We will have to add this update to the profile later
            //--------------
            onClose();
            showMessage("Updated","Profile updated successfully","success")
            console.log("updatedUserInfo: ", updatedUserInfo)
            setIsUpdating(false)
        } catch (error) {
            console.log(error)
            setIsUpdating(false)
        }finally {
            setIsUpdating(false); // Ensure this runs in both success and error cases
        }
    }
    return{isUpdating, updateProfileInfo}
} 

export default useSaveUpdatesToProfile