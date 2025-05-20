import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
const Home = () => {
  return (
    <div className="w-full">
     <Navbar/>
     <Hero/>
     <HowItWorks/>
    </div>
  )
}

export default Home
