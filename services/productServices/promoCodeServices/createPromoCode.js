//importing Product model
const PromoCode = require('../../../models/PromoCode');

//importing logger module
const logger = require("../../../logger");

//method to register new product
async function addPromoCodeService(req,res){

    try {

        //fetching new product from request body
        const promoCode = new PromoCode({
            productId: req.body.productId,
            sellerEmail: req.body.sellerEmail,
            coupons : req.body.coupons
        });

        //saved product
        const savedPromoCode = await promoCode.save();
        res.json({"message" : "Promo Code added to your inventory"});
        logger.info("Promo Code added to the inventory with");
    }
    catch(err) {
        //error handling part
        logger.error("Error while adding Promo Code ");
        res.json({ "message": "Error while adding Promo Code  "});
        console.log(err)
    }  

}

module.exports = addPromoCodeService;