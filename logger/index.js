//importing logger function (configs)
const paymentApiLogger = require('./ecomAPILogger');
let logger = null;

//calling logger function
if(process.env.NODE_ENV !== "production") {
    logger = paymentApiLogger();
}

module.exports = logger;