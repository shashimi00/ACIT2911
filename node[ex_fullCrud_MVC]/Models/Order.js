var mongoose         = require('mongoose');

var orderSchema = mongoose.Schema({
        dateTime:    {"type" : "String"},
        serverName:  {"type": "String"},
        total:       {"type": Number}
    },
    { collection : 'orders' },
);

var Order    = mongoose.model('Order', orderSchema);
module.exports = Order;
