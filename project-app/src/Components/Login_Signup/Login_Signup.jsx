import React from 'react'
import "./Login_Signup.css"
import login_button_icon from "../Assets/login.png"
import password_icon from "../Assets/Password.png"
import create_user_icon from "../Assets/Signup.png"
import username_icon from "../Assets/username.png"

export const Login_Signup = () => {
  return (
    <div className='container'>
    <div className='header'>
      <div className='headerText'>Sign up</div>
    </div>

    <div className='userInputs'>
      <div className='input'>
        <img src={username_icon} width={15} alt=''/>
        <input type='text'/>
      </div>
      <div className='input'>
        <img src={password_icon} width={15} alt=''/>
        <input type='password'/>
      </div>
      <div className="actionButtons">
        <div className="submitt">Create new user</div>
        <div className="submitt">Login</div>
      </div>
    </div>

  </div>
  )
}
