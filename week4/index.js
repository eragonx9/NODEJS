
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, welcome to the Express server!');
});


app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

app.get('/express',(req,res)=>{
    res.send('express js framework');
});

app.post('/data', (req, res) => {
    res.json({ message: 'Data received', data: req.body });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
