var HomeController = require('./Controllers/HomeController');
var ProductController = require('./Controllers/ProductController');

var OrderController = require('./Controllers/OrderController');
var UserController   = require('./Controllers/UserController');

const authMiddleware = require('./authHelper')
const cors           = require('cors');


// Routes
module.exports = function(app){  
    // Main Routes
    // Main Routes
    app.get('/',      HomeController.Index);
    
    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', cors(), UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/User/SecureArea', UserController.SecureArea);
    app.get('/User/ManagerArea', UserController.ManagerArea);

    app.get('/Product/Index', cors(), ProductController.Index);
    app.post('/Product/CreateProduct', cors(), ProductController.CreateProduct);
    app.delete('/Product/Delete', cors(), ProductController.Delete);

    app.get('/Order/Index', cors(), OrderController.Order);
    app.post('/Order/Submit', cors(), OrderController.SubmitOrder);

// Sign in
    app.post(
        '/auth', cors(),
        // middleware that handles the sign in process
        authMiddleware.signIn,
        authMiddleware.signJWTForUser
    )

// Accessible to authenticated user. CORS must be enabled
// for client App to access it.
    app.get('/User/SecureAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.SecureAreaJwt)

// Accessible to manager or admin. CORS must be enabled for
// client App to access it.
    app.get('/User/ManagerAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.ManagerAreaJwt)

// Receives posted data from authenticated users.
    app.post('/User/PostAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.PostAreaJwt)
};

