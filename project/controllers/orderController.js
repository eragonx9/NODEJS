const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { userId, orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'username email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

exports.getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
};
