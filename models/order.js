const mongoose = require("mongoose")

//Schema for the delivery location
//I know I could have imported it from the user model but it honestly doesn't change much
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
    },
  });

  const orderItemSchema = new mongoose.Schema({
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
  

//Schema for the order
const orderSchema = new mongoose.Schema({
    user:
    {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    order:{
        type:{
            items:[orderItemSchema],
            total:Number
        }
    },
    deliveryLocation:locationSchema,
    stage:
    {
        type:String,
        default:`Processing`
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Order", orderSchema, "orders")