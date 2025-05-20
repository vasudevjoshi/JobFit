import React from 'react'
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="w-11/12 h-96 text-center py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 mx-auto rounded-lg mt-8 mb-12">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">AI-Powered Resume Analysis</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Match your resume with job descriptions using advanced AI technology. Get instant feedback and improve your chances of landing your dream job.</p>
      <div className="flex justify-center gap-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center ">Try it Now < ArrowRight className="ml-2"/></button>
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">Create Account</button>
      </div>
    </div>
  )
}

export default Hero
