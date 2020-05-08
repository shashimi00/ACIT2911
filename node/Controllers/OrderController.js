const OrderRepo   = require('../Data/OrderRepo');
const _orderRepo  = new OrderRepo();
const Order       = require('../Models/Order');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Order = async function(request, response){
    let orders = await _orderRepo.allOrders();
    if(orders!= null) {
        response.json({ orders:orders })
    }
    else {
        response.json( { orders:[] })
    }
};

// GET request calls here to display 'Product' submit form.
exports.Create = async function(request, response) {
    response.json( { errorMessage:"", order:{} });
};

exports.SubmitOrder = async function(request, response){
    let tempOrderObj = new Order({
        "userName":request.body.userName,
        // "cartItems":request.body.cartItems,
        "total":request.body.total
    })
    
    let responseObject = await _orderRepo.create(tempOrderObj)
    
     // No errors so save is successful.
     if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.json({ order:responseObject.obj,
                                            errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Order not submitted.");
        response.json( {
                        order:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }

}

