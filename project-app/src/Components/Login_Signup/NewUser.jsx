//Icons
import username_icon from "../Assets/username.png"
import password_icon from "../Assets/Password.png"
import email_icon from "../Assets/Email.png"
import create_user_icon from "../Assets/Signup.png"

import React, { useState } from 'react'
import "./Login_Signup.css"
import {Button} from '@chakra-ui/react'

//For authentication
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../Firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
//Help to display errors (as pop-ups)
import { useDisplayError } from '../../hooks/useDisplayError';
import useAuthStore from "../../globalStates/authStore"

//Change these to use Chakra components since you started doing this with css 

export const NewUser = () => {
    const showMessage = useDisplayError();
    //Use states
    const [loading, setLoading] = useState(false); // State to track loading status
    const [inputs, setInputs] = useState({
      email:'',
      password:'',
      username:''
  });
  //
  const UserLogIn = useAuthStore(state => state.login)
  //const UserLogOut = useAuthStore(state => state.logout)

    //Function to create new user
    const tryCreateNewUser = async () => {
      setLoading(true);
      //If some of the inputs are empty we just return
      if(!inputs.email || !inputs.password || !inputs.username){
        showMessage("Empty?","Fill in all the fields","error")
        setLoading(false);
        return
      }
      try {
        // Check if the username already exists in Firestore
        const usernameQueryExist = await getDocs(query(collection(firestore, 'users'), where('username', '==', inputs.username)));
        if (!usernameQueryExist.empty) {
            throw new Error('Username already exists');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
        const userDocument = {
            userID: userCredential.user.uid,
            email: inputs.email,
            username: inputs.username,
            bio: "",
            profilePicture: "",
            followers: [],
            following: [],
            posts: [],
            profileCreated: Date.now()
        };
        await setDoc(doc(firestore, "users", userCredential.user.uid), userDocument);
        localStorage.setItem("userProfile", JSON.stringify(userDocument));
        UserLogIn(userDocument)
        setLoading(false);
        showMessage("Welcome", "User created successfully", "success");
    } catch (e) {
        setLoading(false);
        showMessage("Whopsie", e.message, "error");
    }
};

  return (
    <div className='userInputs'>
        <div className='input'>
        <img src={username_icon} width={20} alt=''/>
        <input type='text' placeholder='Name' value={inputs.username} 
        onChange={(e) => setInputs({...inputs,username:e.target.value})}
        />
      </div>
      <div className='input'>
        <img src={password_icon} width={20} alt=''/>
        <input type='password' placeholder='Password' value={inputs.password}
        onChange={(e) => setInputs({...inputs,password:e.target.value})}
        />
      </div>
        <div className='input'>
        <img src={email_icon} width={20} alt=''/>
        <input type='Email' placeholder='Email@gmail.com' value={inputs.email}
        onChange={(e) => setInputs({...inputs,email:e.target.value})}
        />
        </div> 

        <Button mx={20} mb={5} gap={3} rounded="full"  colorScheme="blue" onClick={tryCreateNewUser} isLoading={loading}>
          <img src={create_user_icon} width={20} alt=''/> 
          Create new user
        </Button>
    </div>
  )
}
