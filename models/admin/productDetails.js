const mongoose = require('mongoose');
const categoryCLTN = require('../../models/admin/categoryDetails');
const brandCLTN = require('../../models/admin/brandDetails');


const productSchema = new mongoose.Schema({
    name: {
          type: String,
          require : true,
    },
    category :{
          type : mongoose.Types.ObjectId,
          ref:"categories",
          required : true,
    },
    brand : {
      type : mongoose.Types.ObjectId,
      ref:"brands",
      required :true
    },
    size: {
          type : Number,
          required : true,
    },

    price:{
        type: Number,
        required : true
    },

    description: {
        type: String,
        required : true
    },
   
    thumbnail:{
          type : String,
          required : true,
    },
    frontImage:{
          type:String,
          required : true,
    },
    images: [String],
    stock: Number,
    listed: { type: Boolean, default: true },
    updatedBy : String,
});

const productCLTN = new mongoose.model("products", productSchema);
module.exports = productCLTN;