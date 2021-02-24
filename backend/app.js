const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const api = process.env.API_URL;
const productsRouter = require("./routers/products");
const cors = require("cors");

//CORS
app.use(cors());
app.options("*", cors());

//MIDDLEWARE
app.use(bodyParser.json());
app.use(`${api}/products`, productsRouter)
app.use(morgan("tiny"));

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database"
})
.then(() => {
    console.log("Database connection is ready...");
})
.catch((err) => {
    console.log("error connecting to db: ", err);
})


app.listen(3000, () => {
    console.log(api);
    console.log("Server is running on localhost http://localhost:3000");
})