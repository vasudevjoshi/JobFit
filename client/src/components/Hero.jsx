import React from 'react'
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="w-11/12 sm:w-10/12 h-auto sm:h-96 text-center py-14 sm:py-20 px-2 sm:px-4 bg-gradient-to-br from-blue-50 to-purple-50 mx-auto rounded-lg mt-8 mb-12">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
        AI-Powered Resume Analysis
      </h1>
      <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
        Match your resume with job descriptions using advanced AI technology. Get instant feedback and improve your chances of landing your dream job.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-x-4">
        <button className="px-5 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          Try it Now <ArrowRight className="ml-2" />
        </button>
        <button className="px-5 sm:px-6 py-3 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Hero