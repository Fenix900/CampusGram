import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// For theme
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom';
import useSwitchStore from './globalStates/darkModeStore';

const AppWrapper = () => {
  // Fetch the switch state
  const isSwitchOn = useSwitchStore((state) => state.isSwitchOn);

  const styles = {
    global: (props) => ({
      body: {
        bg: isSwitchOn ? "gray.900" : "gray.400",
        color: isSwitchOn ? "white" : "black",
      },
    }),
  };
  //setting the theme of the website 
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
  // 3. extend the theme
  const theme = extendTheme({ config , styles});

  return(
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppWrapper />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
