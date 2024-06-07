import logo from './logo.svg';
import './App.css';
import { Login_Signup } from './Components/Login_Signup/Login_Signup';
import { Button } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import PageLayout from './Components/Sidebar/PageLayout';
import { Profile } from './Components/Profilepage/Profile';
import useAuthStore from '../src/globalStates/authStore';
import { auth } from '../src/Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() { 
  const [validUser , loading, error] = useAuthState(auth);
  return ( 
    <PageLayout >
      <Routes>
        <Route path='/:username' element={<Profile />} />
        <Route path='/' element={validUser ? <Navigate to='/home'/> : <Login_Signup/>} />
        <Route path='/home' element={validUser ? <Home/> : <Navigate to='/'/>} />
      </Routes> 
    </PageLayout>
  );
}

export default App;
