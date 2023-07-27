/* This is version 3 of the e-commerce rest api, 
    What's new:
    - Added checkout logic
    - Added logic for session verification by generating a random 6 digit number.
    - Added ability to change password without login in
    - Removed the user addresses array, user will now only have one address
    - Changed the product's variant array to now be an array of objects with the variant name and increment(how much it will increment the product's base price).
    - Added logic to update a product's rating and decrease it's stock by a certain amount
    - Added logic to decrease a product's stock automatically on checkout
    cart changes:
    - You must now be logged in to add products to cart as the session cart functionality has now been removed
    - Changed the logic to add an item to cart you only add the product ID to the cart item instead of the whole product object,
      this is so that you don't have outdated products in the user cart, mongodb has a populate() method and that's what will be used to return the cart,
      if you wanted to have updated products in the user cart in the previous version you would have to updateMany() and individually update each product for each user that 
      had the product in the cart
    - This version still uses passport local for user authentification as I didn't see the advantage of using jwt.
    - Recent session activity is still stored in the session
*/

//import all the required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const server = express();
const sessionConfig = require("./config/session");

//read request body
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ limit: "10mb", extended: true }));

//initiate session
server.use(session(sessionConfig));

//initiate passport
require("./config/passport")
server.use(passport.initialize());
server.use(passport.session());

//use the router at /routes/index.js
server.use(require("./routes"));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(process.env.SERVER_PORT, () =>
      console.log(`server started on port:${process.env.SERVER_PORT}`)
    )
  )
  .catch((err) => console.error(err));
