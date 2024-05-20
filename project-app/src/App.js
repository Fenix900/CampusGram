import logo from './logo.svg';
import './App.css';
import { Login_Signup } from './Components/Login_Signup/Login_Signup';
import { Button } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import PageLayout from './Components/Sidebar/PageLayout';
import useAuthStore from '../src/globalStates/authStore';

function App() {
  const validUser = useAuthStore(state => state.user);
  return ( 
    <PageLayout >
      <Routes>
        <Route path='/' element={validUser ? <Navigate to='/home'/> : <Login_Signup/>} />
        <Route path='/home' element={validUser ? <Home/> : <Navigate to='/'/>} />
      </Routes> 
    </PageLayout>
  );
}

export default App;
