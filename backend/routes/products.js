const express = require("express");
const router = express.Router();
const Product = require("../models/product")
const Category = require("../models/category")
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
});


const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {

    try {
        //use .select() to tell database which properties to return
        //if you use - and then property name, it will remove that field
        // const productList = await Product.find().select("name image")

        //localhost:3000/api/v1/products?categories=2348faakjl4022jakljs45
        let filter = {};
        if (req.query.categories) filter = {category: req.query.categories.split(",")};
        const productList = await Product.find(filter).populate("category");
        console.log("filter is: ", filter);

        res.send(productList);
    } catch (e) {
        res.status(500).json({success: false})
    };
});

router.get(`/:id`, async (req, res) => {
    //conditional to check to make sure the ID is valid, if not, return right away
    if (!mongoose.isValidObjectId(req.params.id)) res.status(500).send("Invalid Product ID")

    try {
        //use .populate() to combine another table inside the results
        const product = await Product.findById(req.params.id).populate("category");

        if (!product) {
            res.status(404).send("Error finding product")
        } else {
            res.send(product);
        }
    } catch (e) {
        res.status(500).json({success: false})
    };
});


router.post(`/`, uploadOptions.single("image"), async (req, res) => {

    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send("Invalid Category");
        const file = req.file;
        if (!file) return res.status(400).send("No image in the request"); 
    } catch (e) {
        return res.status(500).send("there was an error finding the category")
    };

  try {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    });

    product = await product.save();

    if (!product) {
        return res.status(500).send("The product can't be created");
    } else {
        return res.send(product);
    };

  } catch(e) {
    console.log("this is th error: ", e);
    return res.status(500).send("There was an error")
  };
});

router.put(`/:id`, async (req, res) => {
    //conditional to check to make sure the ID is valid, if not, return right away
    if (!mongoose.isValidObjectId(req.params.id)) res.status(500).send("Invalid Product ID")

    try {

        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send("Invalid Category");
    } catch (e) {
        return res.status(500).send("there was an error finding the category")
    };

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            { new: true}
        );

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(500).json({success:false, message: "the product can not be found"})
        }

    } catch (e) {
        res.status(500).json({success: false, message: e})
    };
});

router.delete("/:id", async (req, res) => {
    //conditional to check to make sure the ID is valid, if not, return right away
    if (!mongoose.isValidObjectId(req.params.id)) res.status(500).send("Invalid Product ID")

    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id)
        if (deletedProduct) {
            return res.status(200).json({success:true, message: "the product is deleted"})
        } else {
            return res.status(404).json({success:true, message: "product not found"})
        };
    } catch (e) {
        return res.status(400).json({success:false, message: e})
    };
});

router.get("/get/count", async (req, res) => {
    //countDocuments is a way of showing how many proudcts the user has in his store
    const productCount = await Product.countDocuments((count) => count);

    if (!productCount) {
        return res.status(500).json({success: false})
    } else {
        return res.send({
            productCount
        });
    }
});

router.get("/get/featured/:count", async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    //how to filter only products that are featured
    const products = await Product.find({isFeatured: true}).limit(+count);

    if (!products) {
        return res.status(500).json({success: false})
    } else {
        return res.send({
            products
        });
    }
});

router.put(`/gallery-images/:id`, uploadOptions.array("images", 10), async (req, res) => {
    //conditional to check to make sure the ID is valid, if not, return right away
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(500).send("Invalid Product ID")

    try {
        const files = req.files;
        const imagesPaths = [];
        const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    
        if (files) {
            files.map(file => {
                console.log("file", file);
                imagesPaths.push(`${basePath}${file.filename}`);
            });
        };

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        );

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(500).json({success:false, message: "the product can not be found"})
        }

    } catch (e) {
        return res.status(500).send("there was an error in adding the images")
    };

    

});

module.exports = router;
