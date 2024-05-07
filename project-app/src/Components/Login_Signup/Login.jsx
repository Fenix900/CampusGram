//Icons
import username_icon from "../Assets/username.png"
import password_icon from "../Assets/Password.png"
import login_button_icon from "../Assets/login.png"

import React, { useState } from 'react'
import "./Login_Signup.css"
import { Button } from '@chakra-ui/react'


//Change these to use Chakra components since you started doing this with css 

export const Login = () => {
    const [inputs, setInputs] = useState({
        password:'',
        username:''
    });

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
        <Button mx={20} mb={5} gap={3} rounded="full" colorScheme="blue" >
          <img src={login_button_icon} width={20} alt=''/> Login as usual
        </Button>
  </div>
  )
}
