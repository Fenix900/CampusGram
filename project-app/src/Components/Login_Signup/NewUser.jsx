//Icons
import username_icon from "../Assets/username.png"
import password_icon from "../Assets/Password.png"
import email_icon from "../Assets/Email.png"
import create_user_icon from "../Assets/Signup.png"

import React, { useState } from 'react'
import "./Login_Signup.css"
import {Button} from '@chakra-ui/react'
import useNewUserWithEmailAndPassword from '../../hooks/useNewUserWithEmailAndPassword'


//Change these to use Chakra components since you started doing this with css 

export const NewUser = () => {
    const [inputs, setInputs] = useState({
        email:'',
        password:'',
        username:''
    });
    const {loading, error, signup} = useNewUserWithEmailAndPassword()

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

        <Button mx={20} mb={5} gap={3} rounded="full"  colorScheme="blue" onClick={() => signup(inputs)} isLoading={loading}>
          <img src={create_user_icon} width={20} alt=''/> 
          Create new user
        </Button>
    </div>
  )
}
