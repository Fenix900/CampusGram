import {create} from "zustand"
//Used to store profile information, difference between this and the "authStore" is 
//that this is for any  profile while auth just stores the authenitcated user
const useProfileInfoStore = create((set) => ({
    userProfileInfo:null,
    //Takes in new value for profile information "NewUserProfileInfo" and updates userProfileInfo with it
    setUserProfileInfo:(NewUserProfileInfo) => set({userProfileInfo:NewUserProfileInfo}),
    //Add a new postID to the posts array 
    addPost: (post) => set(state =>({
        userProfileInfo: {...state.userProfileInfo, posts:[post.id, ...state.userProfileInfo.posts]}
    })),
    // Delete a postID from the posts array
    deletePost: (postId) => set(state => ({
        userProfileInfo: {
            ...state.userProfileInfo,
            posts: state.userProfileInfo.posts.filter(id => id !== postId)
        }
    }))
})) 

export default useProfileInfoStore
