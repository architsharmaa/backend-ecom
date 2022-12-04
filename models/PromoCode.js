//importing moongose module for mongodb
const mongoose = require('mongoose');

//declaring the Inventory schema with feilds
const PromoCodeSchema = mongoose.Schema({
    productId:{
        type: String,
        required : true
    },
    sellerEmail:{
        type: String,
        required : true
    },
    coupons:{
        type: Object,
        required : true
    }

})

module.exports = mongoose.model('PromoCode', PromoCodeSchema);