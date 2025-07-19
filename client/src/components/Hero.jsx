import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/Auth.jsx';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative w-11/12 max-w-6xl h-auto md:h-[32rem] text-center py-16 md:py-24 px-4 mx-auto rounded-xl mt-8 mb-16 overflow-hidden border border-gray-100 shadow-lg">
      {/* Animated Background with subtle grain texture */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNlMWUxZTEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>
      </div>
      
      {/* Floating abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl z-1">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-indigo-100 opacity-40 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-40 mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
          <span>Now with AI</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            <Typewriter
              words={['Resume Intelligence', 'ATS Optimization', 'Career Success']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Elevate your job search with our AI-powered resume analysis. Get precise matching with job descriptions, actionable feedback, and the competitive edge you need.
        </p>
        
        {/* Conditional Button Rendering */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isAuthenticated ? (
            // Buttons for logged-in users
            <>
              <button className="px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group">
                <NavLink to='/analyser' className="flex items-center font-medium">
                  Start Analysis <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium">
                <NavLink to='/profile' className="flex items-center">
                  View Profile
                </NavLink>
              </button>
            </>
          ) : (
            // Buttons for non-logged-in users
            <>
              <button className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group">
                <NavLink to='/login' className="flex items-center font-medium">
                  Start Analyzing <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </button>
              <button className="px-6 py-3 bg-white text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md font-medium">
                <NavLink to='/signup' className="flex items-center">
                  Join Free
                </NavLink>
              </button>
            </>
          )}
        </div>
        
        <div className="mt-10 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((item) => (
              <img 
                key={item}
                className="w-8 h-8 rounded-full border-2 border-white"
                src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item+20}.jpg`}
                alt="User"
              />
            ))}
          </div>
          <span>Trusted by professionals worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;