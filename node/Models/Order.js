var mongoose         = require('mongoose');

var orderSchema = mongoose.Schema({
        // _id:            {"type" : Number },

    name:    {"type" : "String"},
    // // cartItems:  {"type": "String"},
    price:       {"type": Number},
    qty:{"type": Number}
    // cart: [],
    // total: {"type": Number}
},
{ collection : 'orders' },
);

var Order    = mongoose.model('Order', orderSchema);
module.exports = Order;
