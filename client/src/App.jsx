import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Analyser from './pages/Analyse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {


  return (
       
    <div>
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyser" element={<Analyser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
