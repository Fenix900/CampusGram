import { auth, firestore } from '../Firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useDisplayError } from './useDisplayError';

const useNewUserWithEmailAndPassword = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  
  const showMessage = useDisplayError();

  const signup = async (inputs) => {
    //If some of the inputs are empty we just return
    if(!inputs.email || !inputs.password || !inputs.username){
      showMessage("Empty???","Fill in all the fields","error")
      return
    }

    try {
      // Check if the username already exists in Firestore
      const usernameQuerySnapshot = await getDocs(query(collection(firestore, 'users'), where('username', '==', inputs.username)));
      if (!usernameQuerySnapshot.empty) {
        showMessage("Be creative",'Username already exists',"warning");
        return;
      }
      //newUser contains the user information
      console.log("before fail")
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
      console.log(newUser)
      //If there is any errors with the creation of a user
      if(!newUser && error){
        console.log(error.message)
        console.log("This doesn't work sometimes!!!!!!");
        showMessage("Whopsie",error.message ,"error");
        return
      }
      if(newUser){
        const userDocument = {
          userID:newUser.user.uid,
          email:inputs.email,
          username:inputs.username,
          bio:"",
          profilePicture:"",
          followers:[],
          following:[],
          posts:[],
          profileCreated:Date.now()
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
        localStorage.setItem("userProfile",JSON.stringify(userDocument));
        console.log("new user!!!")
      }
    } catch (error) {
      console.log("Tried and catched")
      showMessage("Whopsie",error.message,"error");
    }
  }

  return {loading, error, signup}
}
export default useNewUserWithEmailAndPassword