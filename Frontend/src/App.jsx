import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/user/LandingPage';
import UserSignUpPage from './Pages/user/UserSignupPage';
import UserLoginPage from './Pages/user/UserLoginPage';
import HomePage from './Pages/user/HomePage';
import {Toaster} from 'react-hot-toast';
import UserPdfsPage from './Pages/user/UserPdfsPage';

function App() {

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/documents" element={<UserPdfsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App
