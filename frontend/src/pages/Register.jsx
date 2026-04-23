import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', role: 'passenger'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password, formData.phone, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-10 px-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-indigo-100 mt-1">Join our community today</p>
        </div>
        
        <div className="p-8 pb-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" name="name" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  value={formData.name} onChange={handleChange} placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="email" name="email" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  value={formData.email} onChange={handleChange} placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" name="phone" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="password" name="password" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  value={formData.password} onChange={handleChange} placeholder="••••••••"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select 
                  name="role" 
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition appearance-none bg-white"
                  value={formData.role} onChange={handleChange}
                >
                  <option value="passenger">Passenger (I want to book rides)</option>
                  <option value="driver">Driver (I want to offer rides)</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold text-lg flex items-center justify-center mt-6 transition ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'}`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
