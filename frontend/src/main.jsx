<<<<<<< HEAD
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
=======
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { store} from './redux/store.js' ;
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import { persistStore } from 'redux-persist';

let persistor= persistStore(store) ;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
>>>>>>> 947a9977d70a6cfd3e85991eeae413617b52db47
