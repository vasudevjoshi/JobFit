import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";
import { FileText, Menu, X, ChevronDown, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const Auth = useAuth();

  useEffect(() => {
    setIsLoggedIn(Auth.isAuthenticated);
  }, [Auth.isAuthenticated]);

  return (
    <nav className="w-full h-20 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            JobFit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/analyser"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Analyser
            </Link>
          </div>

          {isLoggedIn && Auth.user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={Auth.user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      Auth.setUser(null);
                      Auth.setIsAuthenticated(false);
                      navigate("/login");
                      setProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40">
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/analyser"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Analyser
            </Link>

            {isLoggedIn && Auth.user ? (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={Auth.user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{Auth.user.FullName}</span>
                </div>
                <Link
                  to="/profile"
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    Auth.setUser(null);
                    Auth.setIsAuthenticated(false);
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full mt-2 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;