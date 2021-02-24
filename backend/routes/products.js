const express = require("express");
const router = express.Router();
const Product = require("../models/product")

router.get(`/`, async (req, res) => {
    try {
        const productList = await Product.find()
        res.send(productList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });
    product.save()
    .then((createdProduct) => {
        res.status(201).json(createdProduct)
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;