//importing Product model
const Product = require('../../../models/Product');

//importing logger module
const logger = require("../../../logger");

//method to read product values
async function deleteProductService(req,res){

    try {

        if(req.body.productId === undefined || req.body.sellerEmail === undefined){
            res.json({"message" : "Invalid delete Request"});
            logger.info("Invalid delete Request ");
        }

        else{

        //delete the object -> first argument is filter and second is set, iterating over variable because dynamic no of arguments
        const deleteProduct = await Product.deleteOne({productId:req.body.productId, sellerEmail:req.body.sellerEmail});
    
        if(deleteProduct.deletedCount === 0){
            //sending failed request response
            res.json({"message" : "Product not deleted from inventory for product id " + req.body.productId});
            logger.info("Product not deleted from inventory with product id " +  req.body.productId);
    
        }
        else{
        //sending response
        res.json({"message" : "Product deleted from your inventory for product id " + req.body.productId});
        logger.info("Product deleted from the inventory with product id " + req.body.productId);
        }
        }
    }
    catch(err) {
        //error handling part
        logger.error("Error deleting the product " + req.body.productId);
        res.json({ "message": "Error while deleting product " + req.body.productId});
    }  

}

module.exports = deleteProductService;