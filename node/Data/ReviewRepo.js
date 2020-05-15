const Review = require('../Models/Review');
var app = require('../app.js');

class ReviewRepo{
    
    ReviewRepo(){
    }

    async allReviews() {
        let reviews = await Review.find().exec()
        return reviews
    }
    
    async create(reviewObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await reviewObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          reviewObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await reviewObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          reviewObj,
                errorMessage: err.message };
    
            return  response;
        }    
    } 

    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem = await Review.find({ _id: id }).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }

    
}
module.exports = ReviewRepo;
