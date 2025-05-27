import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import WhyChooseSkillMatch from '../components/WhyChooseSkillMatch'
import Testimonial from '../components/Testimonial'
import ImproveJobSearch from '../components/ImproveJobSearch'
const Home = () => {
  return (
    <div className="w-full">
     <Hero/>
     <HowItWorks/>
     <WhyChooseSkillMatch/>
     <Testimonial/>
     <ImproveJobSearch/>
    </div>
  )
}

export default Home
