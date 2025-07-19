import './App.css'
import Home from './pages/Home'
import Analyser from './pages/Analyse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster, toast } from 'react-hot-toast';
import {motion, useScroll,useInView} from 'framer-motion'
import {useRef} from 'react'
function App() {
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: "#3b82f6",
          zIndex: 9999,
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />
      <motion.div
      >
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyser" element={<Analyser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer/>
        <Toaster/>
      </motion.div>
    </>
  )
}
export default App
