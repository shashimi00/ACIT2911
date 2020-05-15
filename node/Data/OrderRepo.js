const Order = require('../Models/Order');
var app = require('../app.js');

class OrderRepo{
    
    OrderRepo(){
    }

    async allOrders() {
        let orders = await Order.find().exec()
        return orders
    }
    
    async create(orderObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await orderObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          orderObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await orderObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          orderObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 

    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem = await Order.find({ _id: id }).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }

    async drop(coll){
        app.mongoose.dropCollection(coll)
    }
    
}
module.exports = OrderRepo;
