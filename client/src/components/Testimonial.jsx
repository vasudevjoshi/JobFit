import React from 'react'
import { info } from '../constants/testimonial'
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const Testimonial = () => {
  const ref = useRef(null);
      const isInView = useInView(ref, { once: true });
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: "easeIn" }}
    className="py-10 sm:py-16 mt-10 sm:mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          What Our Users Say
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {info.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-sm flex flex-col justify-center border border-gray-100"
            >
              <div className="flex items-center mb-3 sm:mb-4 gap-x-2">
                <img src={item.imageurl} alt="" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.designation}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Testimonial