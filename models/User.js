//importing moongose module for mongodb
const mongoose = require('mongoose');

//declaring the User schema with feilds
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    phone:{
        type: String,
        required : true
    },
    email: {
        type : String,
        required:true

    },
    password: {
        type : String,
        required:true

    },
    userType: {
        type : String,
        required:false

    }
})

module.exports = mongoose.model('Users', UserSchema);