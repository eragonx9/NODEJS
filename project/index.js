const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/user');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const orderRoutes=require('./routes/order');

const app=express();
const PORT =process.env.PORT || 3000

mongoose.connect('mongodb+srv://ecom:ecom@cluster0.cjzg7lp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('mongodb connected')).catch(()=>console.log(err));

app.use(bodyParser.json());
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' http://localhost:3000");
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
