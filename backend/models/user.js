const mongoose = require("mongoose");

//GOOGLE MONGOOSE SCHEMA TO SEE DOCS REGARDING SCHEMA CONSTRUCTION
const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;