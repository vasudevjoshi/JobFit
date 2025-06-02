import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex-grow container mx-auto px-2 sm:px-4 py-8">
      <div className="min-h-[80vh] flex items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-sm sm:max-w-md p-4 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div>
            <div className='mx-auto flex justify-center'>
              <LogIn className='w-10 h-10 sm:w-12 sm:h-12 text-blue-600'/>
            </div>
            <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <div className="mt-2 text-center text-xs sm:text-sm text-gray-600">
              <p>Or <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">create a new account</Link></p>
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  id="rememberMe"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</label>
              </div>
              <div className="text-xs sm:text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Your Password
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;