//importing express for link routers
const express = require("express");
const router = express.Router();

//importing verify token service to secure routes using JWT authentication
const verify = require('../services/routeServices/authenticatorServices/jwtAuthenticator');

//getting register user service
const resgisterUser = require("../services/routeServices/loginServices/registerUser");
//getting login user service
const loginService = require("../services/routeServices/loginServices/loginService");
//getting add product service
const createProductService = require("../services/productServices/itemServices/createProduct");
//getting read product service
const readProductService = require("../services/productServices/itemServices/readProduct");
//getting add product service
const updateProductService = require("../services/productServices/itemServices/updateProduct");
//getting delete product service
const deleteProductService = require("../services/productServices/itemServices/deleteProduct");
//getting add promo code service
const createPromoCodeService = require("../services/productServices/promoCodeServices/createPromoCode");
//getting create inventory service
const createInventoryService = require("../services/productServices/inventoryServices/createInventory");





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



//create product to a seller -> restricted only for a particular seller
router.get("/add-product", verify, async (req,res) => {
  return await createProductService(req,res);
})
//read product -> not restricted
router.get("/get-product", async (req,res) => {
  return await readProductService(req,res);
})
//update product to a seller -> restricted only for a particular seller
router.get("/update-product", verify, async (req,res) => {
  return await updateProductService(req,res);
})
//delete product ->  restricted
router.get("/delete-product", verify, async (req,res) => {
  return await deleteProductService(req,res);
})



//create inventory for a given productid
router.get("/add-inventory", async (req,res) => {
  return await createInventoryService(req,res);
})

//add Promo code to the given invetory
router.get("/add-promocode", async (req,res) => {
  return await createPromoCodeService(req,res);
})







module.exports = router;
