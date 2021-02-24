const mongoose = require("mongoose");

//GOOGLE MONGOOSE SCHEMA TO SEE DOCS REGARDING SCHEMA CONSTRUCTION
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;