import {create} from "zustand"
//Saves a global hook to get the authenticated user
const useAuthStore = create((set) => ({
    //user is a state, gets it from local storage and uses parse to make it ot an object 
    user:JSON.parse(localStorage.getItem("userProfile")) || null,
    //these sets the user state
    login:(user) => set({user}), 
    logout:() => set({user:null}),
    setUser:(user) => set({user})
}))

export default useAuthStore;