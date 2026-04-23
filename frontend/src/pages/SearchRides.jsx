import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { format } from 'date-fns';
import { Search, MapPin, Calendar, Clock, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchRides = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [date, setDate] = useState(searchParams.get('date') || '');
  
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/rides?source=${source}&destination=${destination}&date=${date}`);
      setRides(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRides();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-indigo-600 py-8 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl flex flex-col md:flex-row gap-4 shadow-lg">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="From" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3.5 text-indigo-500" size={20} />
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="To" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 outline-none text-gray-600" />
            </div>
            <button type="submit" className="bg-indigo-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-800 transition shadow-md">
              Update
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : rides.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800">No rides found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={ride._id} 
                onClick={() => navigate(`/ride/${ride._id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 overflow-hidden group hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg flex items-center">
                        <DollarSign size={18} className="text-green-500 mr-1" />
                        {ride.pricePerKm} / km
                      </h3>
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      {ride.availableSeats} seats left
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative pl-6 border-l-2 border-dashed border-gray-200 ml-3">
                      <div className="absolute -left-2 top-0 w-3.5 h-3.5 bg-gray-300 rounded-full border-2 border-white"></div>
                      <p className="font-medium text-gray-800">{ride.source}</p>
                      
                      <div className="absolute -left-2 bottom-0 w-3.5 h-3.5 bg-indigo-500 rounded-full border-2 border-white"></div>
                      <p className="font-medium text-gray-800 mt-6">{ride.destination}</p>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mt-4 bg-gray-50 p-2 rounded-lg">
                      <Clock size={16} className="mr-2" />
                      {format(new Date(ride.dateTime), 'PPp')}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex items-center group-hover:bg-indigo-50 transition border-t border-gray-100">
                  <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-3">
                    {ride.driverId.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">Driver: {ride.driverId.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRides;
