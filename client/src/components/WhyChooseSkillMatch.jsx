import React from 'react'
import{info} from '../constants/WhyChooseSkillMatch'
const WhyChooseSkillMatch = () => {
  return (
    <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">

            <p className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SkillMatch</p>
            <div className="grid md:grid-cols-2 gap-8">
                {info.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      
    </div>
  )
}

export default WhyChooseSkillMatch
