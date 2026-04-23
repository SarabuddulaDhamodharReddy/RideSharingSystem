import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import { MapPin, Calendar, Clock, DollarSign, Users, ShieldCheck, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const RideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Booking state
  const [seatsToBook, setSeatsToBook] = useState(1);
  const distanceKm = 15; // Simulated distance

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const { data } = await api.get(`/rides/${id}`);
        setRide(data);
      } catch (err) {
        setError('Failed to fetch ride details');
      } finally {
        setLoading(false);
      }
    };
    fetchRide();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role === 'driver') {
      setError('Drivers cannot book rides.');
      return;
    }

    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        rideId: ride._id,
        seatsBooked: seatsToBook,
        distance: distanceKm,
        paymentMethod: 'Card'
      });
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!ride) return <div className="text-center py-20">Ride not found</div>;

  const totalFare = ride.pricePerKm * distanceKm * seatsToBook;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Col: Ride Details */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900">Ride Details</h1>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                {ride.status}
              </span>
            </div>

            <div className="relative pl-8 border-l-2 border-dashed border-gray-200 ml-4 mb-8">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-100 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <p className="text-xl font-bold text-gray-800">{ride.source}</p>
              
              <div className="absolute -left-3 bottom-0 w-6 h-6 bg-indigo-100 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                 <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              </div>
              <p className="text-xl font-bold text-gray-800 mt-12">{ride.destination}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl">
                <Calendar className="text-indigo-500 mr-3" size={24} />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Departure</p>
                  <p className="font-medium">{format(new Date(ride.dateTime), 'MMM d, yyyy')}</p>
                  <p className="text-sm">{format(new Date(ride.dateTime), 'h:mm a')}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl">
                <Users className="text-indigo-500 mr-3" size={24} />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Availability</p>
                  <p className="font-medium">{ride.availableSeats} seats left</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Driver Profile</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-md">
                {ride.driverId.name[0]}
              </div>
              <div>
                <p className="font-bold text-lg">{ride.driverId.name}</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <ShieldCheck size={16} className="text-green-500 mr-1" />
                  Verified Driver
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Booking Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-80"
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-50 sticky top-6">
            <h3 className="font-bold text-xl mb-6">Booking Summary</h3>
            
            {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm">{error}</div>}

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Price per km</span>
              <span className="font-semibold">${ride.pricePerKm}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Est. Distance</span>
              <span className="font-semibold">{distanceKm} km</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Seats needed</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  type="button"
                  onClick={() => setSeatsToBook(Math.max(1, seatsToBook - 1))}
                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition"
                >-</button>
                <span className="px-4 py-1 font-medium">{seatsToBook}</span>
                <button 
                  type="button"
                  onClick={() => setSeatsToBook(Math.min(ride.availableSeats, seatsToBook + 1))}
                  className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition"
                >+</button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Fare</span>
                <span className="text-2xl font-black text-indigo-600">${totalFare.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleBook}
              disabled={bookingLoading || ride.availableSeats === 0}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 ${bookingLoading ? 'bg-indigo-400' : ride.availableSeats === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'}`}
            >
              {bookingLoading ? 'Processing...' : ride.availableSeats === 0 ? 'Fully Booked' : 'Confirm & Pay'}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Payment is mock logic. No real charge will be made.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default RideDetails;
