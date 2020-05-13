var mongoose         = require('mongoose');

var orderSchema = mongoose.Schema({
    userName:    {"type" : "String"},
    // cartItems:  {"type": "String"},
    total:       {"type": Number}
},
{ collection : 'orders' },
);

var Order    = mongoose.model('Order', orderSchema);
module.exports = Order;
