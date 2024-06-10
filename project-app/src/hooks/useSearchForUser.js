import { useState } from 'react'
import { firestore } from '../Firebase/firebase';
import { collection, query, getDocs, orderBy, startAt, endAt } from 'firebase/firestore';
import { useDisplayError } from './useDisplayError';


const useSearchForUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const showMessage = useDisplayError();

    const clearUsers = () => {
      setUsers([])
    }

    const searchUser = async (username, activeSearch) => { //Username is the search string we want to look for in our documents
        setIsLoading(true)
        if(username === ""){
            showMessage("Field empty","Could not search with empty","warning")
            setIsLoading(false)
            return
        }
        try {
          const usersRef = collection(firestore, 'users')
          const q = query(usersRef, orderBy('usernameLower'), startAt(username.toLowerCase()), endAt(username.toLowerCase() + '\uf8ff')); // Updated query
          const querySnapshot = await getDocs(q) //all the documents where the "usernameLower" matches the input "username"
          
          if (querySnapshot.empty) {
            setUsers([])
            if(!activeSearch){
              showMessage("No users found","Could not find user with name '"+username+"'", "warning")
            }
          } else {
            const userList = []; // Collect multiple users
            querySnapshot.forEach((doc) => {
                userList.push({ id: doc.id, ...doc.data() });
            });
            setUsers(userList); // Set the state with the list of users
          }
        } catch (e) {
          console.log(e)
          showMessage("Error",e,"error")
        } finally {
          setIsLoading(false)
        }
      }
    
      return { isLoading, users, searchUser, clearUsers}
}

export default useSearchForUser