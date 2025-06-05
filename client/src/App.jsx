import './App.css'
import Home from './pages/Home'
import Analyser from './pages/Analyse'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster, toast } from 'react-hot-toast';
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
      <Toaster/>
    </div>
  )
}

export default App
