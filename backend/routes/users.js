const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.SECRET;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

module.exports = router;
