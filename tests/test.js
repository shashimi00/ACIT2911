// imports dependencies for testing
var chai = require('chai');
var mongoose = require('mongoose');
var chaiHttp = require('chai-http');
var app = require('../app.js');

// Configures chai
chai.use(chaiHttp);
chai.should();

describe("Products API Tests", () => {
    before(function(){
        mongoose.createConnection('mongodb://localhost:27017/madmenDB')
    });
    describe("GET /Product/Index", () => {
        // tests
        it("OK, products are retrieved.", (done) => {
            chai.request(app)
                .get(`/Product/Index`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // show entire contents of response
                    console.log(JSON.stringify(res.body));

                    done();
                });
        });
    

        it("Testing product Names", (done) => {
            chai.request(app)
                .get(`/Product/Index`)
                .end((err, res) => {
                    // // Extract 'products' from API response
                    let products = res.body.products;
                    // // Ensure value is correct
                    products[0]["productName"].should.equal("Cobb Salad");
                    products[1]["productName"].should.equal("Thai Noodles");
                    products[2]["productName"].should.equal("Fruit Flan");
                    products[3]["productName"].should.equal("Orange Juice");

                    done();
                });
        });

        it("Testing product prices", (done) => {
            chai.request(app)
                .get(`/Product/Index`)
                .end((err, res) => {
                    // // Extract 'products' from API response
                    let products = res.body.products;
                    // // Ensure value is correct
                    products[0]["price"].should.equal(11.99);
                    products[1]["price"].should.equal(12.99);
                    products[2]["price"].should.equal(8.99);
                    products[3]["price"].should.equal(2.99);

                    done();
                });
        })
    });
});
