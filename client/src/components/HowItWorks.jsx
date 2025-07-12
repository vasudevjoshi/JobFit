import React from "react";
import { FileText, TrendingUp, CircleCheckBig, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      icon: FileText,
      title: "Upload Documents",
      description: "Upload your resume and the job description you're interested in",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "AI Analysis",
      description: "Our AI analyzes both documents to identify skill matches and gaps",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: CircleCheckBig,
      title: "Get Results",
      description: "Receive detailed feedback and actionable suggestions",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-semibold tracking-wide text-indigo-600 uppercase"
          >
            Process
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            How It Works
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="relative z-10"
            >
              <div className="group flex flex-col items-center text-center h-full">
                <div className={`p-1 rounded-full mb-6 bg-gradient-to-r ${step.color}`}>
                  <div className={`${step.bgColor} p-4 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300`}>
                    <step.icon className={`h-8 w-8 ${step.iconColor} group-hover:text-current`} />
                  </div>
                </div>
                
                <div className="px-4">
                  <div className="flex items-center justify-center mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-r ${step.color} mr-2`}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-2 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
         
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;