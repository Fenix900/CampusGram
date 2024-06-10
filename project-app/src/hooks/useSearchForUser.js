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

          // Query for usernameLower
          const usernameQuery = query(
            usersRef,
            orderBy('usernameLower'),
            startAt(username.toLowerCase()),
            endAt(username.toLowerCase() + '\uf8ff')
        );
        // Query for profileDisplayName
        const profileDisplayNameQuery = query(
            usersRef,
            orderBy('profileDisplayName'.toLowerCase()),
            startAt(username.toLowerCase()),
            endAt(username.toLowerCase() + '\uf8ff')
        );

          const querySnapshotUsername = await getDocs(usernameQuery) //all the documents where the "usernameLower" matches the input "username"
          const querySnapshotDisplayNameQuery = await getDocs(profileDisplayNameQuery) //All documents where we can find the input in the displayName
          // Combine results, avoiding duplicates
          const userList = new Map();
          querySnapshotUsername.forEach((doc) => { //Adds all users with their username
            userList.set(doc.id, { id: doc.id, ...doc.data() });
          });
          querySnapshotDisplayNameQuery.forEach((doc) => { //Adds all users if their display name gave some match
              if (!userList.has(doc.id)) { //Check if this user is already in the userList
                  userList.set(doc.id, { id: doc.id, ...doc.data() });
          }});

          if (userList.size === 0) { //If there are no users found
            setUsers([])
            if(!activeSearch){
              showMessage("No users found","Could not find user with name '"+username+"'", "warning")
            }
          } else {
            setUsers(Array.from(userList.values())); // Convert map values to an array
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