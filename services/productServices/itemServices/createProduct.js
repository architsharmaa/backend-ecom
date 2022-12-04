//importing Product model
const Product = require('../../../models/Product');

//importing logger module
const logger = require("../../../logger");

//method to register new product
async function createProductService(req,res){

    try {

        //fetching new product from request body
        const product = new Product({
            productId: req.body.productId,
            seller: req.body.seller,
            sellerEmail: req.body.sellerEmail,
            nameOfItem : req.body.nameOfItem,
            description : req.body.description,
            category: req.body.category,
            price: req.body.price,
            tags: req.body.tags || req.body.nameOfItem.split(" ").concat(req.body.category.split(" ")) ,
            timeStamp: req.body.timeStamp || Date.now()
        });

        //saved product
        const savedProduct = await product.save();
        res.json({"message" : "Product added to your inventory for product id " + product.productId});
        logger.info("Product added to the inventory with product id " + product.productId);
    }
    catch(err) {
        //error handling part
        logger.error("Error while adding product " + product.productId);
        res.json({ "message": "Error while adding product " + product.productId});
    }  

}

module.exports = createProductService;