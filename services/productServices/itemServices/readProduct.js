//importing Product model
const Product = require('../../../models/Product');

//importing logger module
const logger = require("../../../logger");

//method to read product values
async function readProductService(req,res){

    try {

        //getting product list, argument is filter
        const products = await Product.find(req.body);
    
        //sending response
        res.json({products});
        logger.info("Product fetched with response " + Object.keys(products).length);
        
    }
    catch(err) {
        //error handling part
        logger.error("Error fetching products ");
        res.json({ "message": "Error while fetching products"});
    }  

}

module.exports = readProductService;