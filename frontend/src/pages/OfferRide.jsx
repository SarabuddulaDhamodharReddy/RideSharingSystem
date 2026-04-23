import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const OfferRide = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: '', destination: '', dateTime: '', availableSeats: 3, pricePerKm: 10
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/rides', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to offer ride');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-8 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Offer a Ride</h1>
          <p className="text-gray-500 mt-2">Publish your ride and find passengers along your route.</p>
        </div>

        <div className="p-8 bg-gray-50/50">
          {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg mb-6">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input required type="text" name="source" value={formData.source} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. New York" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-indigo-500" size={18} />
                  <input required type="text" name="destination" value={formData.destination} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. Boston" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input required type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input required type="number" min="1" max="8" name="availableSeats" value={formData.availableSeats} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Km ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input required type="number" min="1" step="0.1" name="pricePerKm" value={formData.pricePerKm} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition hover:bg-indigo-700 shadow-lg mt-4">
              {loading ? 'Publishing...' : 'Publish Ride'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferRide;
