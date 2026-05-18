import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import Login from './pages/Login'
import './App.css'
function App(){
  return (
   <Routes>
    <Route path="/login" element={<Login />} />
  
   </Routes>

  )
}
export default App;