import { useState } from 'react'
import { firestore, storage } from '../Firebase/firebase'
import useAuthStore from '../globalStates/authStore';
import { useDisplayError } from '../hooks/useDisplayError';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import useProfileInfoStore from '../globalStates/profileInfoStore';

const useSaveUpdatesToProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    //Gets the user info locally
    const userInfo = useAuthStore((state) => state.user);
    const setUserInfo = useAuthStore((state) => state.setUser);
    const showMessage = useDisplayError();
    const setUsersProfileInfo = useProfileInfoStore((state) => state.setUserProfileInfo)

    //Function to update information about the user
    const updateProfileInfo = async (inputs, uploadedProfilePic) => {

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
            const newUserInfo = { //New user information to be updated
                ...userInfo,
                username: inputs.username || userInfo.username,
                profileDisplayName: inputs.displayText || userInfo.profileDisplayName,
                bio: inputs.description || userInfo.bio,
                profilePicture: imageURL || userInfo.profilePicture,
                usernameLower: inputs.username.toLowerCase() || userInfo.usernameLower 
            }

            //We update the user information document "docRef" with "newUserInfo"
            await updateDoc(docRef, newUserInfo)
            //This updates the local information without having to refetch the information or sign-out&in
            localStorage.setItem("userProfile", JSON.stringify(newUserInfo));
            setUserInfo(newUserInfo);  //Update the local information about the user itself
            setUsersProfileInfo(newUserInfo);   //We also want to update the user info to display since we are in the profile page
            //--------------
            //Ad updater so profile updates when Save is hit. Now it doesn't update the profile and no fetch to the data base is done ---------
            console.log("The user information", userInfo) //We will have to add this update to the profile later
            //--------------
            showMessage("Updated","Profile updated successfully","success")
            console.log("newUserInfo: ", newUserInfo)
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