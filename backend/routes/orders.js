const express = require("express");
const router = express.Router();
const Order = require("../models/order")

router.get(`/`, async (req, res) => {
    try {
        const orderList = await Order.find()
        res.send(orderList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

// router.post(`/`, (req, res) => {
//     const order = new Order({
//         name: req.body.name,
//         image: req.body.image,
//         countInStock: req.body.countInStock
//     });
//     order.save()
//     .then((createdOrder) => {
//         res.status(201).json(createdOrder)
//     })
//     .catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// })

module.exports = router;
