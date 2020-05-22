const Product = require('../Models/Product');

class ProductRepo {

    // This is the constructor.
    ProductRepo() {
    }

    // Gets all products.
    async allProducts() {
        let products = await Product.find().exec();
        return products;
    }

    async getProduct(id) {
        let product = await Product.findOne({ _id: id }).exec();
        return product;
    }

    async create(productObj) {
        try {var error = await productObj.validateSync();
            if (error) {
                let response = { obj: productObj, errorMessage: error.message };
                return response;  }

            const result = await productObj.save();
            let response = {obj: result,errorMessage: ""};
            return response;}

        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {obj: productObj, errorMessage: err.message };
            return response;}
    }


    async delete(id) {
        console.log("Id to be deleted is: " + id); 
        let deletedItem = await Product.find({ _id: id }).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }

   
}

module.exports = ProductRepo;
