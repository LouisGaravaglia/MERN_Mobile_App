const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.get(`/`, async (req, res) => {
    try {
        const usersList = await User.find()
        res.send(usersList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

// router.post(`/`, (req, res) => {
//     const users = new User({
//         name: req.body.name,
//         image: req.body.image,
//         countInStock: req.body.countInStock
//     });
//     users.save()
//     .then((createdUsers) => {
//         res.status(201).json(createdUsers)
//     })
//     .catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// })

module.exports = router;
