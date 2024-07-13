const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
};

exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');

    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};
