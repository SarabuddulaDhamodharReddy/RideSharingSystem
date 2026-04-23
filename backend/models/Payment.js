const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Success', 'Failed'], 
    default: 'Pending' 
  },
  paymentMethod: { type: String, default: 'Card' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
