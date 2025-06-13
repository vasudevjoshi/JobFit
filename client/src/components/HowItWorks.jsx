import React from "react";
import { FileText,TrendingUp,CircleCheckBig } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // `once: true` means it animates only the first time

  return (
    <motion.div 
       ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: "easeIn" }}
    className="w-11/12 mx-auto py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 mx-auto">
        How It Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 mx-auto px-2 sm:px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5 sm:mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-2">Upload Documents</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Upload the resume and the job description you are interested in
          </p>
        </div>

        <div className="text-center mx-auto">
          <div className="w-16 h-16  bg-purple-100 rounded-full flex items-center justify-center mb-5 sm:mb-7 mx-auto">
            <TrendingUp className="" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-2">AI Analysis</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Our AI analyzes both documents and identifies skill matches and gaps.
          </p>
        </div>

        <div className="text-center mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5 sm:mb-7 mx-auto">
            <CircleCheckBig className="" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-2">Get Results</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Receive detailed feedback and suggestions for improvement.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;