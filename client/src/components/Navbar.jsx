import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { useAuth } from "../context/Auth.jsx"; // Adjust the import path as necessary

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const Auth = useAuth();
  useEffect(() => {
    if (Auth.isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, [Auth.isAuthenticated]);

  return (
    <div className="w-full h-18 bg-white shadow-sm relative">
      <div className="w-11/12 flex justify-between items-center mx-auto py-4 px-4">
        <Link to="/" className="flex gap-x-2 items-center px-4 space-x-2">
          <div className="flex justify-center items-center w-9 h-9 bg-blue-500 rounded-md text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
          </div>
          <p className="font-bold text-2xl font-sans">JobFit</p>
        </Link>
        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-x-4 list-style-none">
            <li className="font-black-400 text-md">
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="font-black-400 text-md">
              <Link to="/analyser" className="hover:text-blue-600">
                Analyser
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-x-4">
          {isLoggedIn && Auth.user ? (
            <>
              <Link to="/">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={Auth.user.image}
                    alt="user-profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </Link>
              <button
                className="w-20 h-10 text-md text-white bg-red-500 hover:bg-red-600 rounded-lg"
                onClick={() => {
                  Auth.setUser(null);
                  Auth.setIsAuthenticated(false);
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center">
                <button className="text-md font-black-500 hover:text-blue-600">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-20 h-10 text-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white px-4 pb-4 z-50 shadow-lg border-b">
          <ul className="flex flex-col gap-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/analyser"
                className="block py-2 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Analyser
              </Link>
            </li>
            {isLoggedIn && Auth.user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-blue-600 flex items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      <img
                        src={Auth.user.image}
                        alt="user-profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {Auth.user.FullName}
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full h-10 text-md text-white bg-red-500 hover:bg-red-600 rounded-lg"
                    onClick={() => {
                      Auth.setUser(null);
                      Auth.setIsAuthenticated(false);
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block py-2">
                    <button className="w-full h-10 text-md text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
