//Icons
import username_icon from "../Assets/username.png"
import password_icon from "../Assets/Password.png"
import login_button_icon from "../Assets/login.png"
import email_icon from "../Assets/Email.png"


import React, { useState } from 'react'
import "./Login_Signup.css"
import { Button } from '@chakra-ui/react'
import { useDisplayError } from '../../hooks/useDisplayError';

//Firebase for signIn
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../Firebase/firebase';
import { doc, getDoc } from "firebase/firestore"
import useAuthState from "../../globalStates/authStore"

//Change these to use Chakra components since you started doing this with css 

export const Login = () => {
    const showMessage = useDisplayError();
    const [loading, setLoading] = useState(false); // State to track loading status
    const [inputs, setInputs] = useState({
        password:'',
        username:''
    });
    //Function when trying to sign in
    const setLoginUserInfo = useAuthState((state)=>state.login);
    const tryLogin = async () => {
      setLoading(true);
      if(!inputs.email || !inputs.password){
        showMessage("Empty?","Fill in all the fields","error")
        setLoading(false);
        return
      }
      try {
        const userCredential = signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        const docRef = doc(firestore, "users", (await userCredential).user.uid);
        const docSnap = await getDoc(docRef); 
        localStorage.setItem("userProfile", JSON.stringify(docSnap.data()));
        setLoginUserInfo(docSnap.data())
        setLoading(false);
      } catch (e) {
        showMessage("Whops", "Wrong email or password", "error");
        setLoading(false);
      }
    }

  return (
    <div className='userInputs'>
        <div className='input'>
            <img src={email_icon} width={20} alt=''/>
            <input type='Email' placeholder='Email@gmail.com' value={inputs.email}
            onChange={(e) => setInputs({...inputs,email:e.target.value})}
            />
        </div>
        <div className='input'>
            <img src={password_icon} width={20} alt=''/>
            <input type='password' placeholder='Password' value={inputs.password}
            onChange={(e) => setInputs({...inputs,password:e.target.value})}
            />
        </div>
        <Button mx={20} mb={5} gap={3} rounded="full" colorScheme="blue" onClick={tryLogin} isLoading={loading}>
          <img src={login_button_icon} width={20} alt=''/> Login as usual
        </Button>
  </div>
  )
}
