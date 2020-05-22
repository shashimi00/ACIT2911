var mongoose         = require('mongoose');

var orderSchema = mongoose.Schema({
    name:    {"type" : "String"},
    price:       {"type": Number},
    qty:{"type": Number}
},
{ collection : 'orders' },
);

var Order    = mongoose.model('Order', orderSchema);
module.exports = Order;
