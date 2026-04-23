const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBooking);
router.route('/my-bookings').get(protect, getMyBookings);

module.exports = router;
