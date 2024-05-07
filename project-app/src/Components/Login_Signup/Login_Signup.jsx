import React, { useState } from 'react'
import "./Login_Signup.css"
import login_button_icon from "../Assets/login.png"
import create_user_icon from "../Assets/Signup.png"
import { Button } from '@chakra-ui/react'
import { NewUser } from './NewUser'
import { Login } from './Login'

export const Login_Signup = () => {
 /*Maybe add forget password here*/
  const [action, setAction] = useState("Login");

  return (
    /*This part is the whole sign in page*/
    <div className='container'>
    <div className='header'>
      <div className='headerText'>{action}</div>
    </div>
    {/*user input field: Username and password*/}
    <div className='userInputs'> 
      {action==="New user"? <NewUser /> : <Login /> /*Do we want to show newUser or Login*/} 

      {/*Two buttons for either log in or create a new user*/}
      <div className="actionButtons">
        <Button  rounded="full"  colorScheme={action==="Login"?"gray":"blue"} onClick={() => {
          if (action === "New user") {
            console.log("Action is already 'New user'");
          } else {
            setAction("New user");
          }}}>
          New user?
        </Button>
        <Button rounded="full" colorScheme={action==="Login"?"blue":"gray"} onClick={() => {
          if (action === "Login") {
            console.log("Action is already 'Login'");
          } else {
            setAction("Login");
          }}}>
          Login?
        </Button>
      </div>
    </div>
  </div>
  )
}
