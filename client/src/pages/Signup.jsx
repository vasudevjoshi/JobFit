import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast'

const Signup = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    password: '',
    otp: ''
  });
  const [step, setStep] = useState(1); // 1: details, 2: OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/v1/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        setStep(2);
        setMessage('OTP sent to your email.');
        toast.success('OTP sent to your email.');
      } else {
        setMessage(data.message || 'Failed to send OTP');
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage('Error sending OTP');
      toast.error('Error sending OTP');
    }
    setLoading(false);
  };

  // Step 2: Complete Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setMessage('Signup successful! You can now log in.');
        toast.success('Signup successful! You can now log in.');
      } else {
        setMessage(data.message || 'Signup failed');
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      setMessage('Error during signup');
      toast.error('Error during signup');
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow container mx-auto px-2 sm:px-4 py-8">
      <div className="min-h-[80vh] flex items-center justify-center px-2 sm:px-4">
        <div className="w-full max-w-sm sm:max-w-md p-4 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div>
            <div className='mx-auto flex justify-center'>
              <UserPlus className='w-10 h-10 sm:w-12 sm:h-12 text-blue-600'/>
            </div>
            <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
              Create An Account
            </h2>
            <div className="mt-2 text-center text-xs sm:text-sm text-gray-600">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login</Link>
              </p>
            </div>
          </div>
          {message && (
            <div className={`my-4 text-center text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>
            </div>
          )}
          {success ? (
            <div className="text-center text-green-600 font-semibold">
              Signup successful! <Link to="/login" className="underline text-blue-600">Login here</Link>
            </div>
          ) : step === 1 ? (
            <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="FullName" className="block text-xs sm:text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="FullName"
                    name="FullName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    placeholder="Full Name"
                    value={formData.FullName}
                    onChange={handleChange}
                  />
                </div>
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
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-xs sm:text-sm font-medium text-gray-700">OTP</label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;