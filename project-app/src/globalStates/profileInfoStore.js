import {create} from "zustand"
//Used to store profile information, difference between this and the "authStore" is 
//that this is for any  profile while auth just stores the authenitcated user
const useProfileInfoStore = create((set) => ({
    userProfileInfo:null,
    //Takes in new value for profile information "NewUserProfileInfo" and updates userProfileInfo with it
    setUserProfileInfo:(NewUserProfileInfo) => set({userProfileInfo:NewUserProfileInfo})
})) 

export default useProfileInfoStore
