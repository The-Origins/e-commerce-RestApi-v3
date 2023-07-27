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


//Schema for the order
const orderSchema = new mongoose.Schema({
    user:
    {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    order:{
        type:{
            items:[],
            total:Number
        }
    },
    deliveryLocation:locationSchema
},
{
    timestamps:true
})

module.exports = mongoose.model("Order", orderSchema, "orders")