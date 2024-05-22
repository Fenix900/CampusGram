import { useState } from 'react'
import { firestore, storage } from '../Firebase/firebase'
import useAuthStore from '../globalStates/authStore';
import { useDisplayError } from '../hooks/useDisplayError';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const useSaveUpdatesToProfile = () => {
    const [isUpdating, setIsUspdating] = useState(false);
    //Gets the user info locally
    const userInfo = useAuthStore((state) => state.user);
    const showMessage = useDisplayError();


    //Function to update information about the user
    const updateProfileInfo = async (inputs, uploadedProfilePic) => {
        //To check if the user pushed the button again while uploading
        if(isUpdating){
            showMessage("Pleas wait", "Uploading...","warning")
            return
        }
        //Start uploading
        setIsUspdating(true);
        //reference to database for profilepics (storage)
        const storageRef = ref(storage, `usersProfilePics/${userInfo.uid}`);
        //document to update the user info
        const docRef = doc(firestore, "users", userInfo.uid);
        
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
                profilePicture: imageURL || userInfo.profilePicture
            }
            //We update the user information document "docRef" with "newUserInfo"
            await updateDoc(docRef, newUserInfo)
            //This updates the local information without having to refetch the information or sign-out&in
            localStorage.setItem("userProfile", JSON.stringify(newUserInfo));
            userInfo(newUserInfo);
            //--------------
            //Ad updater so profile updates when Save is hit. Now it doesn't update the profile and no fetch to the data base is done ---------
            console.log("The user information", userInfo) //We will have to add this update to the profile later
            //--------------
            showMessage("Updated","Profile updated successfully","success")
            setIsUspdating(false)
        } catch (error) {
            showMessage("Something went wrong",error,"error")
            setIsUspdating(false)
        }
    }
    return{isUpdating, updateProfileInfo}
} 

export default useSaveUpdatesToProfile