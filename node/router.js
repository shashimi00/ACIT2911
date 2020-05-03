var HomeController = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');
const cors = require('cors');

// Routes
module.exports = function(app){  
    // Main Routes
    // Main Routes
    app.get('/',      HomeController.Index);
    app.get('/Product/Index', cors(), ProductController.Index);
    app.post('/Product/CreateProduct', cors(), ProductController.CreateProduct);
    app.delete('/Product/Delete', cors(), ProductController.Delete);
    app.get('/Product/Edit', ProductController.Edit);
    app.put('/Product/Update', cors(), ProductController.Update);
};

