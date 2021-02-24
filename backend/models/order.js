const mongoose = require("mongoose");

//GOOGLE MONGOOSE SCHEMA TO SEE DOCS REGARDING SCHEMA CONSTRUCTION
const orderSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;