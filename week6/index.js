const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://21ucs195:shiven09@cluster0.dxvuuil.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('node api connected to mongodb'))
    .catch((error) => console.log(error));


app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
