const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    try {
        const usersList = await User.find().select("-passwordHash")
        res.send(usersList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

router.get(`/:id`, async (req, res) => {
    try {
        // selects only the name phone and email to return
        // const user = await User.findById(req.params.id).select("name phone email");
        const user = await User.findById(req.params.id).select("-passwordHash");
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(500).json({success:false, message: "the user can not be found"})
        }

    } catch (e) {
        res.status(500).json({success: false, message: e})
    };
});

router.post("/register", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    try {
        user = await user.save();
        return res.send(user);
    } catch (e) {
        return res.status(404).send("the user can't be created")
    };
});


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
