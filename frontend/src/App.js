import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/chat' element={<ChatPage />} />
      <Route path='/login' element={<LoginPage />} exact/>
    </Routes>
    
    </BrowserRouter>
    
  )
}