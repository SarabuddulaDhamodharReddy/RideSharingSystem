import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// We will create the pages shortly
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OfferRide from './pages/OfferRide';
import SearchRides from './pages/SearchRides';
import RideDetails from './pages/RideDetails';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offer-ride" element={<OfferRide />} />
          <Route path="/search" element={<SearchRides />} />
          <Route path="/ride/:id" element={<RideDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
