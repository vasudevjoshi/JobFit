import React from 'react'
import photo from '../assets/hero.jpg' // Import your image here
const Hero = () => {
  return (
   <div className="relative h-screen w-screen">
  {/* Background Image */}
  <div 
    className="w-11/12 absolute inset-0 h-[100%] bg-cover bg-center bg-no-repeat mx-auto"
    style={{
      backgroundImage: `url(${photo})`,
    }}
  />

  {/* Centered Content */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex gap-x-8 items-center justify-center w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-[121px] leading-[100%] text-[#049890] font-Inter ">JobFit</h1>
        <button className="bg-[#FFCB3C] font-bold text-lg gap-x-4 leading-[100%] font-Inter rounded-3xl px-12 py-3 text-black mt-4">
          Get Started
        </button>
        <p className="text-[#79858A] font-bold text-md mb-20 mt-4">
          Take the first step towards finding your dream job
        </p>
        <p className="w-9/12 font-bold text-5xl text-black font-Inter">
          Unlock Your Career with <span className="text-[#fad56e] ">Potential</span>
        </p>
      </div>
      
      <div className="w-[450px] h-[450px] rounded-full"
        style={{ 
          background: 'linear-gradient(90deg, #1CC6B2 0%, #045885 100%)'
        }}
      />
    </div>
  </div>
</div>
  )
}

export default Hero