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



exports.SubmitOrder = async function(request, response){
    let tempOrderObj = new Order({
        // "_id":request.body._id,
        "name":request.body.name,
        // "cart":request.body.cart,
        "price":request.body.price,
         "qty":request.body.qty
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

exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _orderRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
}


