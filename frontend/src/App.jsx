import React from 'react'
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { axiosInstance } from "./lib/axios.js";
import { useAuthStore } from './store/useAuthStore.js';

const App = () => {

  const { authUser, checkAuth } = useAuthStore();

  useEffect( () => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

  return (
    <div>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />

      </Routes>
    </div>
  )
}

export default App
