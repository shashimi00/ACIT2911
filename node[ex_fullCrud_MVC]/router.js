var HomeController = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');
var OrderController = require('./Controllers/OrderController');
const cors = require('cors');

// Routes
module.exports = function(app){
    // Main Routes
    // Main Routes
    app.get('/',      HomeController.Index);
    app.get('/Product/Index', cors(), ProductController.Index);
    app.post('/Product/CreateProduct', cors(), ProductController.CreateProduct);
    app.delete('/Product/Delete', cors(), ProductController.Delete);
    app.get('/Order/Index', cors(), OrderController.Order);
    app.post('/Order/Submit', cors(), OrderController.SubmitOrder);
};

