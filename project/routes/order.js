const express = require('express');
const { createOrder, getOrderById, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.get('/user/:userId', protect, getUserOrders);

module.exports = router;
