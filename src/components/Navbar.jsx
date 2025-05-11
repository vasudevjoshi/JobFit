import React from 'react'

const Navbar = () => {
  return (
    <div className="w-11/12 h-[50px] flex justify-end items-center bg-white font-semibold text-lg leading-[100%] font-Inter text-[#063D86] gap-x-4 mb-2 mt-2">
      <ul className="list-none flex gap-4 items-center justify-center">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div>
        <button 
          className="text-white font-semibold text-lg leading-[100%] font-Inter rounded-xl px-4 py-1.5"
          style={{ background: 'linear-gradient(90deg, #0DBAEA 0%, #054455 100%)' }}
        >
          Analyse
        </button>
      </div>
    </div>
  )
}

export default Navbar