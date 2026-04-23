const Ride = require('../models/Ride');

// @desc    Create a ride
// @route   POST /api/rides
// @access  Private/Driver
const createRide = async (req, res, next) => {
  try {
    const { source, destination, dateTime, availableSeats, pricePerKm } = req.body;

    const ride = new Ride({
      driverId: req.user._id,
      source,
      destination,
      dateTime,
      availableSeats,
      pricePerKm,
      status: 'Active'
    });

    const createdRide = await ride.save();
    res.status(201).json(createdRide);
  } catch (error) {
    next(error);
  }
};

// @desc    Search/Get active rides
// @route   GET /api/rides
// @access  Public
const getRides = async (req, res, next) => {
  try {
    const { source, destination, date } = req.query;
    
    // Base filter: only Active rides
    let filter = { status: 'Active', availableSeats: { $gt: 0 } };

    if (source) filter.source = { $regex: source, $options: 'i' };
    if (destination) filter.destination = { $regex: destination, $options: 'i' };
    
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.dateTime = { $gte: searchDate, $lt: nextDay };
    } else {
      filter.dateTime = { $gte: new Date() }; // future rides only
    }

    const rides = await Ride.find(filter).populate('driverId', 'name phone').sort({ dateTime: 1 });
    res.json(rides);
  } catch (error) {
    next(error);
  }
};

// @desc    Get ride by ID
// @route   GET /api/rides/:id
// @access  Public
const getRideById = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driverId', 'name phone email');
    if (ride) {
      res.json(ride);
    } else {
      res.status(404);
      throw new Error('Ride not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get rides offered by a specific driver
// @route   GET /api/rides/driver/my-rides
// @access  Private/Driver
const getMyRides = async (req, res, next) => {
  try {
    const rides = await Ride.find({ driverId: req.user._id }).sort({ dateTime: 1 });
    res.json(rides);
  } catch (error) {
    next(error);
  }
};

module.exports = { createRide, getRides, getRideById, getMyRides };
