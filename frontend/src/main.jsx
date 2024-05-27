import React from 'react'
//import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "./context/userContext";
//import ColorModeSwitcher from "./ColorModeSwitcher"
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <AuthProvider>
  <Router>
    {/* <ColorModeScript /> */}
    <ChakraProvider disableGlobalStyle>
      {/* <ColorModeSwitcher /> */}
      <App />
    </ChakraProvider>
  </Router>
</AuthProvider>
)
