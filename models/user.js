const mongoose = require("mongoose");
const Product = require("../models/product");

//Schema for the user's address
const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    lowercase: true,
  },
  state: {
    type: String,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  street: {
    type: String,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
  }
});

//Schema for each item in the users cart
//The createdAt property was getting changed at each modification so I made it immutable
//the product field will be populated on request
//this ensures that product data will be up to date
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  variant: String,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: {
        first: {
          type: String,
          required: true,
          lowercase: true,
        },
        last: {
          type: String,
          lowercase: true,
        },
      },
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: {
        code: {
          type: String,
          default: "+1",
        },
        number: {
          type: Number,
          reqired: true,
          unique: true,
        },
      },
    },
    address: {
      type: locationSchema,
    },
    hash: String,
    salt: String,
    admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    pfp: {
      type: String,
      default: "https://tchblg.de/wp-content/uploads/user-avatar.png",
    },
    cart: {
      items: [cartItemSchema],
      total: {
        type: Number,
        default: 0,
      },
    },

  //store locations the user has used on checkout
  locationHistory:[locationSchema]
  },
  {
    timestamps: true,
  }
)

//User model
module.exports = mongoose.model("User", userSchema, "users")
