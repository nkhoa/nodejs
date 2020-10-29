const express = require('express');
const router =  express.Router();

const Product = require('../models/product');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET Request'
    })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product.save().then(res => console.log(res)).catch(res => console.log(res));
    res.status(200).json({
        message: 'Handling POST Request',
        data: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'ID Passed',
        id: id
    })
});

module.exports = router;
