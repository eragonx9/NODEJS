const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { name, description, price, countInStock, category, image } = req.body;

    const product = new Product({
        name,
        description,
        price,
        countInStock,
        category,
        image
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

exports.getProducts = async (req, res) => {
    const { keyword, category } = req.query;
    let query = {};

    if (keyword) {
        query.name = { $regex: keyword, $options: 'i' };
    }

    if (category) {
        query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
};


exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, countInStock, category, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;
        product.category = category || product.category;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};
