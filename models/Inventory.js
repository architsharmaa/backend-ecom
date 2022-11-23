//importing moongose module for mongodb
const mongoose = require('mongoose');

//declaring the Inventory schema with feilds
const InventorySchema = mongoose.Schema({
    productId:{
        type: String,
        required : true
    },
    sellerEmail:{
        type: String,
        required : true
    },
    inventoryCount:{
        type: Number,
        required : true
    },
    discountPercent:{
        type: Number,
        required : false
    },
    discountDaysValidity:{
        type: Number,
        required : false
    }

})


module.exports = mongoose.model('Inventory', InventorySchema);