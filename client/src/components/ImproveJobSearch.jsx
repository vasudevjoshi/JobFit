import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ImproveJobSearch = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: "easeIn" }}
    className="w-11/12 sm:w-10/12 py-10 sm:py-16 mt-10 sm:mt-20 bg-blue-600 mx-auto rounded-lg">
      <div className="max-w-4xl mx-auto text-center text-white px-2 sm:px-4">
        <p className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Ready to Improve Your Job Search
        </p>
        <p className="text-base sm:text-xl mb-6 sm:mb-8">
          Join thousands of job seekers who have optimised their applications with JobFit
        </p>
        <button className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
          Get Started <ArrowRight className="ml-2" />
        </button>
      </div>
    </motion.div>
  )
}

export default ImproveJobSearch