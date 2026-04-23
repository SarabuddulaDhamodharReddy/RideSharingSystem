import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import { MapPin, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'passenger') {
          const res = await api.get('/bookings/my-bookings');
          setData(res.data);
        } else if (user.role === 'driver') {
          const res = await api.get('/rides/driver/my-rides');
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {user.role === 'driver' ? 'My Offered Rides' : 'My Bookings'}
      </h1>
      
      {data.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <p className="text-gray-500 text-lg">You have no {user.role === 'driver' ? 'rides' : 'bookings'} yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
              {user.role === 'passenger' ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {item.status}
                    </span>
                    <span className="font-bold text-lg">${item.totalFare}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                      <span className="truncate">{item.rideId.source} → {item.rideId.destination}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                      <span>{format(new Date(item.rideId.dateTime), 'PPp')}</span>
                    </div>
                    <div className="pt-4 mt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500">Driver: {item.rideId.driverId?.name}</p>
                      <p className="text-sm text-gray-500">Seats Booked: {item.seatsBooked}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${item.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {item.status}
                    </span>
                    <span className="font-bold text-lg">${item.pricePerKm}/km</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                      <span className="truncate">{item.source} → {item.destination}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                      <span>{format(new Date(item.dateTime), 'PPp')}</span>
                    </div>
                    <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-center">
                      <p className="text-sm text-gray-500">Seats left: {item.availableSeats}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
