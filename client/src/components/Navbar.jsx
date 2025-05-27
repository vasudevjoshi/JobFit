import React from 'react'
import { Link } from 'react-router-dom'
import { IoDocumentText } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="w-full h-18 bg-white shadow-sm">
      <div className="w-11/12 flex justify-between items-center mx-auto py-4 px-4">
        <Link to="/" className="flex gap-x-2 items-center px-4 space-x-2">
          <div className="flex justify-center items-center w-9 h-9 bg-blue-500 rounded-md text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
          </div>
          <p className="font-bold text-2xl font-sans">JobFit</p>
        </Link>
        <div>
          <ul className="flex gap-x-4 list-style-none">
            <li className="font-black-400 text-md">
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="font-black-400 text-md">
              <Link to="/analyser" className="hover:text-blue-600">Analyser</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-x-4">
          <Link to="/login" className="flex items-center">
            <button className="text-md font-black-500 hover:text-blue-600">Login</button>
          </Link>
          <Link to="/signup">
            <button className="w-20 h-10 text-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar