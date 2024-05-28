import { useState } from 'react'
import { firestore } from '../Firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useDisplayError } from './useDisplayError';


const useSearchForUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showMessage = useDisplayError();

    const searchUser = async (username) => { //Username is the search string we want to look for in our documents
        setIsLoading(true)
        if(username === ""){
            showMessage("Field empty","Could not search with empty","warning")
            setIsLoading(false)
            return
        }
        try {
          const usersRef = collection(firestore, 'users')
          const q = query(usersRef, where('usernameLower', '==', username.toLowerCase()))
          const querySnapshot = await getDocs(q) //all the documents where the "usernameLower" matches the input "username"
          
          if (querySnapshot.empty) {
            setUser(null)
            showMessage("No users found","Could not find user with name '"+username+"'", "warning")
          } else {
            querySnapshot.forEach((doc) => {
              setUser({ id: doc.id, ...doc.data() })
            })
          }
        } catch (e) {
          console.log(e)
          showMessage("Error",e,"error")
        } finally {
          setIsLoading(false)
        }
      }
    
      return { isLoading, user, searchUser}
}

export default useSearchForUser