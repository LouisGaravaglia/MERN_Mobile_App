const mongoose = require("mongoose");

//GOOGLE MONGOOSE SCHEMA TO SEE DOCS REGARDING SCHEMA CONSTRUCTION
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

//this is a way to add a new property but copying it from an existing field, this case
//we are copying the _id property to a property just called id
productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

productSchema.set("toJSON", {
    virtuals: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;