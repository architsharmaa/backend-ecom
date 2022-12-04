//importing Product model
const Inventory = require('../../../models/Inventory');

//importing logger module
const logger = require("../../../logger");

//method to inventory  new product
async function createInventoryService(req,res){

    try {

        //fetching new product from request body
        const inventory = new Inventory({
            productId: req.body.productId,
            sellerEmail: req.body.sellerEmail,
            inventoryCount : req.body.inventoryCount,
            discountPercent : req.body.discountPercent || 0,
            discountDaysValidity: Date.now(req.body.discountDaysValidity) || Date.now(365) ,
        });

        //saved product
        const savedinventory = await inventory.save();
        res.json({"message" : "Your Inventory is updated for " + inventory.productId});
        logger.info("Inventory is updated for " + inventory.productId);
    }
    catch(err) {
        //error handling part
        logger.error("Error while updating inventory " + inventory.productId);
        res.json({ "message": "Error while updating inventory " + inventory.productId});
        console.log(err)
    }  

}

module.exports = createInventoryService;