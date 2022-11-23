//importing express for link routers
const express = require("express");
const router = express.Router();

//getting register user service
const resgisterUser = require("../services/routeServices/loginServices/registerUser");
//getting login user service
const loginService = require("../services/routeServices/loginServices/loginService");
//getting add product service
const createProductService = require("../services/productServices/itemServices/createProduct");

router.get("/post", (req, res) => {
  res.send("this value is rendered");
});

//add or signup a user
router.get("/register", async (req,res) => {
  return await resgisterUser(req,res);
});

//login user and provide jwt/refresh tokens for the particular user
router.get("/login", async (req,res) => {
  return await loginService(req,res);
})

//login user and provide jwt/refresh tokens for the particular user
router.get("/add-product", async (req,res) => {
  return await createProductService(req,res);
})


module.exports = router;
