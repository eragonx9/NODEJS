const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addToCart);
router.post('/remove', protect, removeFromCart);
router.get('/:userId', protect, getCart);

module.exports = router;
