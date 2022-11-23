//importing moongose module for mongodb
const mongoose = require('mongoose');

//declaring the Product schema with feilds
const ProductSchema = mongoose.Schema({
    productId:{
        type: String,
        required : true
    },
    seller:{
        type: String,
        required : true
    },
    sellerEmail:{
        type: String,
        required : true
    },
    nameOfItem:{
        type: String,
        required : true
    },
    description: {
        type : String,
        required:true

    },
    category: {
        type : String,
        required:true

    },
    price: {
        type : String,
        required:true

    },
    tags: {
        type : Array,
        required:false

    },
    timeStamp: {
        type : Date,
        required:true

    }
})

module.exports = mongoose.model('Product', ProductSchema);