import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
  };

  return (
    <div className="relative overflow-hidden bg-indigo-50 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight">
              Your ride, your choice. <br/>
              <span className="text-indigo-600">Travel together & Earn!</span>
            </h1>
            <p className="text-xl text-gray-600">
              Share your empty seats, save on travel costs, and meet great people along the way.
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mt-8">
              <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Leaving from..." 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-indigo-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Going to..." 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition text-gray-600"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                >
                  <Search size={22} />
                  Search Rides
                </button>
              </form>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            {/* Elegant placeholder image illustration style */}
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-100 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
                alt="Car traveling on a scenic road" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl rotate-3"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
