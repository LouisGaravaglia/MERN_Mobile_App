const express = require("express");
const router = express.Router();
const Category = require("../models/category")

router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find()
        res.status(200).send(categoryList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

router.get(`/:id`, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(500).json({success:false, message: "the category can not be found"})
        }

    } catch (e) {
        res.status(500).json({success: false, message: e})
    };
});

router.put(`/:id`, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            },
            { new: true}
        );

        if (category) {
            res.status(200).send(category);
        } else {
            res.status(500).json({success:false, message: "the category can not be found"})
        }

    } catch (e) {
        res.status(500).json({success: false, message: e})
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

router.delete("/:id", async (req, res) => {

    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.id)
        if (deletedCategory) {
            return res.status(200).json({success:true, message: "the category is deleted"})
        } else {
            return res.status(404).json({success:true, message: "category not found"})
        };
    } catch (e) {
        return res.status(400).json({success:false, message: e})
    };

});

module.exports = router;
