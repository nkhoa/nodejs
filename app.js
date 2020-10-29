const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://nodejs:123456!@#@cluster0.n8c9j.mongodb.net/nodejs?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found !!');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
            code: error.status || 500
        }
    })
})
module.exports = app;
