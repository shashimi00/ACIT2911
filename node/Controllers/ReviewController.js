const ReviewRepo   = require('../Data/ReviewRepo');
const _reviewRepo  = new ReviewRepo();
const Review      = require('../Models/Review');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Review = async function(request, response){
    let reviews = await _reviewRepo.allReviews();
    if(reviews!= null) {
        response.json({ reviews:reviews })
    }
    else {
        response.json( { reviews:[] })
    }
};



exports.SubmitReview = async function(request, response){
    let tempReviewObj = new Review({
        "name":request.body.name,
        "userName":request.body.userName,
        "review":request.body.review,
        "rating":request.body.rating,
    })
    
    let responseObject = await _reviewRepo.create(tempReviewObj)
    
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


