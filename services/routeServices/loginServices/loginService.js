//importing User model
const Users = require('../../../models/User');

//importing bcrypt for hashing password
const bcrypt = require('bcrypt');

//importing jwt to use jwt features
const jwt = require('jsonwebtoken');

//importing logger module
const logger = require("../../../logger");

//importing config file modules to call value from config file
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

//importing dynamic values from config file
const REFRESH_SECRET = properties.get("REFRESH_SECRET");
const JWT_SECRET = properties.get("JWT_SECRET");

//method to login using credentials
async function loginService(req,res){

    //fetching values from request body
    const {email, password} = req.body;
        
    try{

        //finding user from database
        const user = await Users.findOne({email:email}).lean();

        //to check if user does not exit then exists with message
        if(!user) {
            logger.info("Login attempt using Invalid Username/password");
            return res.json ({"message" : 'Invalid Username/password'});
        }

        //check success match of password if user exists 
        if(await bcrypt.compare(password, user.password)){

            //on success match of password genrating JWT token
            const token = jwt.sign({
                id: user._id,
                email: user.email
            },JWT_SECRET,{expiresIn:'1800s'});


            //on success match of password genrating refresh token
            const refreshtoken = jwt.sign({
                id: user._id,
                email: user.email
            },REFRESH_SECRET,{expiresIn:'5d'});

            const userType = user.userType;

            logger.info("Login attempt successful for user : " + email);

            //returning JWT Token and  Refresh Token
            return res.header('auth-token', token).send({token, refreshtoken, userType});
        }

        logger.info("Login attempt using Invalid Username/password");

        //returning message for unsuccessful match of password
        res.json ({"message": 'Invalid Username/password'});


    }catch(err){
        console.log(err);
        logger.error("Error in Login attempt, something went wrong");
        //error handling
        res.json({"message": "Error in login attempts"});

    }
}

module.exports = loginService;