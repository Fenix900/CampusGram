import {create} from "zustand"
//Used to store profile information
const useProfileInfoStore = create((set) => ({
    userProfileInfo:null,
    //Takes in new value for profile information "NewUserProfileInfo" and updates userProfileInfo with it
    setUserProfileInfo:(NewUserProfileInfo) => set({userProfileInfo:NewUserProfileInfo})
})) 

export default useProfileInfoStore
