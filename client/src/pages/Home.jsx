import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import WhyChooseSkillMatch from '../components/WhyChooseSkillMatch'
import Testimonial from '../components/Testimonial'
import ImproveJobSearch from '../components/ImproveJobSearch'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <main className="flex flex-col gap-4 sm:gap-8">
        <Hero />
        <HowItWorks />
        <WhyChooseSkillMatch />
        <Testimonial />
        <ImproveJobSearch />
      </main>
    </div>
  )
}

export default Home