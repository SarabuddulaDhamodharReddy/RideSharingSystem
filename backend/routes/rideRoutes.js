const express = require('express');
const router = express.Router();
const { createRide, getRides, getRideById, getMyRides } = require('../controllers/rideController');
const { protect, driverOnly } = require('../middleware/authMiddleware');

router.route('/').post(protect, driverOnly, createRide).get(getRides);
router.route('/driver/my-rides').get(protect, driverOnly, getMyRides);
router.route('/:id').get(getRideById);

module.exports = router;
