import logo from './logo.svg';
import './App.css';
import { Login_Signup } from './Components/Login_Signup/Login_Signup';
import { Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import PageLayout from './Components/Sidebar/PageLayout';
import { Profile } from './Components/Profilepage/Profile';

function App() {
  return ( 
    <PageLayout>
      <Routes>
        <Route path='/' element={<Login_Signup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/:username' element={<Profile />} />
      </Routes> 
    </PageLayout>
  );
}

export default App;
