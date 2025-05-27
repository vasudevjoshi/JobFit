import React from 'react'
import{info} from '../constants/testimonial'
const Testimonial = () => {
  return (
    <div className="py-16 mt-20">
        <div className="max-w-5xl mx-auto px-4 ">

            <p className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</p>
            <div className="grid md:grid-cols-4 gap-8">

                {info.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-4 gap-x-2">
                            <img src={item.imageurl} alt="" className="w-12 h-12 rounded-full "/>
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600 text-sm">{item.designation}</p>
                            </div>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>                                                      

        </div>
      
    </div>
  )
}

export default Testimonial
