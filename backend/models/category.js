const mongoose = require("mongoose");

//GOOGLE MONGOOSE SCHEMA TO SEE DOCS REGARDING SCHEMA CONSTRUCTION
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;