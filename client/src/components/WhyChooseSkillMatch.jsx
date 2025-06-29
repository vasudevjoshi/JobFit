import React from 'react'
import { info } from '../constants/WhyChooseSkillMatch'
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const WhyChooseSkillMatch = () => {
   const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  return (
    <motion.div 
    ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: "easeIn" }}
    className="py-10 sm:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Why Choose SkillMatch
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {info.map((item, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default WhyChooseSkillMatch