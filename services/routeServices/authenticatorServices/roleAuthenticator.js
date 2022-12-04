//importing User model
const Users = require('../../../models/User');

//fucntion to verify the user based on roles and acess
async function roleAuthentication (verified, url) {
    
    //admin access type
    const adminUser = ['/payments', '/payments/paymentDetails', '/payments/meta-data']

    //access for sellers
    const seller = ['/add-product', '/delete-product', '/update-product', '/delete-product'];

    //access for buyers
    const buyer = ['/add-product', '/delete-product'];

    //finding user from database
    const user = await Users.findOne({email:verified.email}).lean();

    //checking for admin acess
    if(user.userType === "seller") {
        if(!seller.includes(url)) {
           return 'Acess Denied';
        }
   }


}


module.exports = roleAuthentication;