const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const api = process.env.API_URL;
const cors = require("cors");

//ROUTES
const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

//CORS
app.use(cors());
app.options("*", cors());

//MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);

//DATABASE
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

//SERVER
app.listen(3000, () => {
    console.log(api);
    console.log("Server is running on localhost http://localhost:3000");
})