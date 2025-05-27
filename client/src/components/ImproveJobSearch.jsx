import React from 'react'
import {ArrowRight} from 'lucide-react'
const ImproveJobSearch = () => {
  return (
    <div className=" w-10/12 py-16 mt-20 bg-blue-600 mx-auto">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
            <p className="text-3xl font-bold mb-6">Ready to Improve Your Job Search</p>
            <p className="text-xl mb-8">Join thousands of job seekers who have optimised their applications with JobFit</p>
            <button className='inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50,transition-colors'>Get Started <ArrowRight className="ml-2"/> </button>
        </div>
    </div>
  )
}

export default ImproveJobSearch
