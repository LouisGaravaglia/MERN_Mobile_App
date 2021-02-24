const express = require("express");
const router = express.Router();
const Category = require("../models/category")

router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find()
        res.send(categoryList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

router.post("/", async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });

    try {
        category = await category.save();
        return res.send(category);
    } catch (e) {
        return res.status(404).send("the category can't be created")
    };
});


module.exports = router;
