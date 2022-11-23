//importing User model
const Users = require('../../../models/User');

//importing bcrypt for hashing password
const bcrypt = require('bcrypt');

//importing logger module
const logger = require("../../../logger");

//method to register new user
async function registerUserService(req,res){
    

    try {

        //fetching new user and password from request body
        const user = new Users({
            name: req.body.name,
            phone: req.body.phone,
            email : req.body.email,
            password : req.body.password,
            userType: req.body.userType || 'normal' //adding default value to the userType
        });
    
        //hashing plane text into bcrypt to store in database
        user.password = await bcrypt.hash(user.password,10);

        //finding duplicate email from database
        const duplicateEmail = await Users.findOne({email:user.email}).lean();

        //finding duplicate phone from database
        const duplicatePhone = await Users.findOne({phone:user.phone}).lean();

        //dupliate email check
        if(duplicateEmail){
            res.json({"message" : "Duplicate Email, email already exists"});
            logger.info("Error while adding user : Duplicate Email, email already exists");
        }

        //dupliate phone check
        else if(duplicatePhone){
            res.json({"message" : "Duplicate Phone, phone already exists"});
            logger.info("Error while adding user : Duplicate Phone, phone already exists");
        }

        //save user into database
        else{  
        const savedUser = await user.save();
        res.json({"message" : "User added"});
        logger.info("User Added with username : " + user.email + ", " + user.phone);
        }
    }
    catch(err) {
        //error handling part
        logger.error("Error while adding user ");
        res.json({ "message": "Error while adding user "});
        console.log(err)
    }  

}

module.exports = registerUserService;