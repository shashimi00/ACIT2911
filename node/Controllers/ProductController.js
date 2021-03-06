const ProductRepo   = require('../Data/ProductRepo');
const _productRepo  = new ProductRepo();
const Product       = require('../Models/Product');

// This is the default page for domain.com/product/index.
// It shows a listing of products if any exist.
exports.Index = async function(request, response){
    let products = await _productRepo.allProducts();
    if(products!= null) {
        response.json({ products:products })
    }
    else {
        response.json( { products:[] })
    }
};

// Shows one single object at a time. 
exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let productID  = request.query._id; 
    
    let productObj = await _productRepo.getProduct(productID);
    response.json( { product:productObj });
}

// GET request calls here to display 'Product' create form.
exports.Create = async function(request, response) {
    response.json( { errorMessage:"", product:{} });
};

// Receives POST data and tries to save it.
exports.CreateProduct = async function(request, response) {
    let tempProductObj  = new Product( {
        "_id":request.body._id, "productName":    request.body.productName,
        "price":request.body.price,"description": request.body.description,
        "path":request.body.path
    });
    // Call Repo to save 'Product' object.
    let responseObject = await _productRepo.create(tempProductObj);

    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        response.json({ product:responseObject.obj,
                                            errorMessage:""});
    }else {
        console.log("An error occured. Item not created.");
        response.json( {
                        product:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }
};




// This function receives an id when it is posted. 
// It then performs the delete and shows the product listing after.
// A nicer (future) version could take you to a page to confirm the deletion first.
exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _productRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let products     = await _productRepo.allProducts();
    response.json( {products:products});
}

