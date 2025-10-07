import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">CarbonSense</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Dashboard
                  </Link>
                  <Link to="/calculator" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Calculator
                  </Link>
                  <Link to="/history" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    History
                  </Link>
                  <Link to="/ai-suggestions" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    AI Suggestions
                  </Link>
                  <Link to="/leaderboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Leaderboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Login
                  </Link>
                  <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="ml-4 flex items-center md:ml-6">
                <span className="mr-4">Welcome, {userInfo.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;