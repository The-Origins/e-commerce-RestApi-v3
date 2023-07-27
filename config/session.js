require("dotenv").config;
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

//max age of the session (lifespan)
const sessionMaxAge = 24 * 60 * 60;

//session config
module.exports = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    mongooseConnection: mongoose.connection,
    ttl: sessionMaxAge,
    collectionName: "sessions",
  }),
  cookie: {
    httpOnly: true,
    maxAge: sessionMaxAge * 1000,
  },
};
