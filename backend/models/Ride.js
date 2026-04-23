const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  dateTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  pricePerKm: { type: Number, required: true, default: 10 },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'Cancelled'], 
    default: 'Active' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
