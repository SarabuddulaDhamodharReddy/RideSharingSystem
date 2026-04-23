const Booking = require('../models/Booking');
const Ride = require('../models/Ride');
const Payment = require('../models/Payment');

// @desc    Create a new booking & mock payment
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { rideId, seatsBooked, paymentMethod } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      res.status(404);
      throw new Error('Ride not found');
    }

    if (ride.availableSeats < seatsBooked) {
      res.status(400);
      throw new Error('Not enough seats available');
    }

    // Since we don't have a real distance matrix API here, we will just simulate totalFare = seatsBooked * pricePerKm * 10 (assuming 10km)
    // OR frontend can pass the estimated distance. Let's just assume a static distance of 15km for calculation if not provided.
    const distanceKm = req.body.distance || 15;
    const totalFare = ride.pricePerKm * distanceKm * seatsBooked;

    const booking = new Booking({
      userId: req.user._id,
      rideId,
      seatsBooked,
      totalFare,
      status: 'Confirmed' // Direct confirmation for simplicity
    });

    const createdBooking = await booking.save();

    // Decrease available seats
    ride.availableSeats -= seatsBooked;
    await ride.save();

    // Mock Payment creation
    const payment = new Payment({
      bookingId: createdBooking._id,
      amount: totalFare,
      paymentStatus: 'Success',
      paymentMethod: paymentMethod || 'Card'
    });
    
    await payment.save();

    res.status(201).json({ booking: createdBooking, payment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({
        path: 'rideId',
        populate: {
          path: 'driverId',
          model: 'User',
          select: 'name phone'
        }
      })
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getMyBookings };
