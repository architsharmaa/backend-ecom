//importing Product model
const Product = require('../../../models/Product');

//importing logger module
const logger = require("../../../logger");

//method to update product
async function updateProductService(req,res){

    try {

        if(req.body.productId === undefined || req.body.sellerEmail === undefined){
            res.json({"message" : "Invalid Update Request"});
            logger.info("Invalid Update Request ");
        }

        else{

        //updating the object -> first argument is filter and second is set, iterating over variable because dynamic no of arguments
        const updated = await Product.updateOne({productId:req.body.productId, sellerEmail:req.body.sellerEmail},{ $set : req.body});

        if(updated.modifiedCount === 0){
        //sending failed request response
        res.json({"message" : "Product not found or no change detected in your inventory for product id " + req.body.productId});
        logger.info("Product not updated to the inventory with product id " +  req.body.productId);

        }
        else{
        //sending succeful request response
        res.json({"message" : "Product updated to  inventory for product id " + req.body.productId});
        logger.info("Product updated to the inventory with product id " + req.body.productId);
        }
        }
    }
    catch(err) {
        //error handling part
        logger.error("Error updated adding product " + req.body.productId);
        res.json({ "message": "Error while updated product " + req.body.productId});
    }  

}

module.exports = updateProductService;