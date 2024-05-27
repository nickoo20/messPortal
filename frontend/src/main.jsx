import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {BrowserRouter} from 'react-router-dom' ;  
import { AuthProvider } from '../context/userContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
