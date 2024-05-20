import {create} from "zustand"

const useAuthStore = create((set) => ({
    //user is a state
    user:JSON.parse(localStorage.getItem("userProfile")) || null,
    //these sets the user state
    login:(user) => set({user}), 
    logout:() => set({user:null}),
    setUser:(user) => set({user})
}))

export default useAuthStore;