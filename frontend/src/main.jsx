
import React from 'react'
//import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "./context/userContext";
//import ColorModeSwitcher from "./ColorModeSwitcher"

import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { store} from './redux/store.js' ;
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from 'redux-persist';

let persistor= persistStore(store) ;
// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
 
//       {/* <ColorModeSwitcher /> */}
//       <App />

// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider >
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
);

