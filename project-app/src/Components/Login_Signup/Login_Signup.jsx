import React, { useState } from 'react'
import "./Login_Signup.css"
import login_button_icon from "../Assets/login.png"
import password_icon from "../Assets/Password.png"
import create_user_icon from "../Assets/Signup.png"
import username_icon from "../Assets/username.png"

export const Login_Signup = () => {
  {/*Maybe add forget password here*/}

  const [action, setAction] = useState("Login");

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
        <input type='text' placeholder='Name'/>
      </div>
      <div className='input'>
        <img src={password_icon} width={20} alt=''/>
        <input type='password' placeholder='Password'/>
      </div>
      {/*Two buttons for either log in or create a new user*/}
      <div className="actionButtons">
        <div className={action==="Login"?"submitt grayOut":"submitt"} onClick={()=>{setAction("New user")}}>New user</div>
        <div className={action==="New user"?"submitt grayOut":"submitt"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>

  </div>

  )
}
