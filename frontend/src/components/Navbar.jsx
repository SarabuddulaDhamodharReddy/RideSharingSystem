import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Car, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              <Car size={24} />
            </div>
            <span className="font-bold text-xl text-indigo-900 tracking-tight">Travel&Earn</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Find Ride
            </Link>
            {user?.role === 'driver' && (
              <Link to="/offer-ride" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                Offer Ride
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4 border-l pl-4">
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors">
                  <User size={18} />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 border-l pl-4">
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 shadow-md transform transition hover:-translate-y-0.5">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
