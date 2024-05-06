import React, { useState } from 'react'
import "./Login_Signup.css"
import login_button_icon from "../Assets/login.png"
import password_icon from "../Assets/Password.png"
import create_user_icon from "../Assets/Signup.png"
import username_icon from "../Assets/username.png"
import email_icon from "../Assets/Email.png"
import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const Login_Signup = () => {
 /*Maybe add forget password here*/
  const [action, setAction] = useState("Login");
  const nav =  useNavigate();
  //Hook for the inputs
  const [inputs, setInputs] = useState({
    email:'',
    password:'',
    username:''
  });

  //This handles the authintication
  const handleAuthin = () => {
    console.log(inputs)
    if(!inputs.username || !inputs.password){
      alert("Please fill all fields"); 
      return;
    }
    nav("/home");
  }

  return (
    /*This part is the whole sign in page*/
    <div className='container'>
    <div className='header'>
      <div className='headerText'>{action}</div>
    </div>
    {/*user input field: Username and password*/}
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
      {action==="New user"?
            <div className='input'>
            <img src={email_icon} width={20} alt=''/>
            <input type='Email' placeholder='Email@gmail.com' value={inputs.email}
            onChange={(e) => setInputs({...inputs,email:e.target.value})}
            />
          </div>:
          null
      }


      {/*Two buttons for either log in or create a new user*/}
      <div className="actionButtons">
        <Button  rounded="full"  colorScheme={action==="Login"?"gray":"blue"}   
          onClick={() => {
          if (action === "New user") {
            console.log("Action is already 'New user'");
            handleAuthin();
          } else {
            setAction("New user");
          }}}>
          <img src={create_user_icon} width={20} alt=''/> New user
        </Button>
        <Button rounded="full" colorScheme={action==="Login"?"blue":"gray"} onClick={() => {
          if (action === "Login") {
            console.log("Action is already 'Login'");
            handleAuthin();
          } else {
            setAction("Login");
          }}}>
          <img src={login_button_icon} width={20} alt=''/> Login
        </Button>
      </div>
      <Text>Dark/Light? You have to sign out to change this</Text>
    </div>
  </div>
  )
}



  /* Old buttons, but upgraded to chakras own, since I will be using their libary.
        <div className={action==="Login"?"submitt grayOut":"submitt"} onClick={()=>{setAction("New user")}}>
          <img src={create_user_icon} width={20} alt=''/> New user
        </div>
        <div className={action==="New user"?"submitt grayOut":"submitt"} onClick={()=>{setAction("Login")}}>
        <img src={login_button_icon} width={20} alt=''/> Login
        </div>
  */
