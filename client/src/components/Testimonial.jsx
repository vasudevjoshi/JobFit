import React from 'react';
import { info } from '../constants/testimonial';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from 'lucide-react';

const Testimonial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-4 sm:py-12 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-semibold tracking-wide text-indigo-600 uppercase"
          >
            Testimonials
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="absolute top-6 right-6 text-yellow-400 opacity-20 group-hover:opacity-30 transition-opacity">
                <Quote className="h-8 w-8" />
              </div>
              <div className="flex items-center mb-4 gap-x-3">
                <img 
                  src={item.imageurl} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.designation}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                "{item.description}"
              </p>
              <div className="text-xs text-gray-400 mt-auto">
                {item.date}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their job search with our platform.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonial;