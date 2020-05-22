// imports dependencies for testing
var chai = require('chai');
var superagent = require('superagent');
var mongoose = require('mongoose');
var chaiHttp = require('chai-http');
var app = require('../app.js');

// Configures chai
chai.use(chaiHttp);
chai.should();

// travis ci stuff
var url = "mongodb://localhost:27017/madmenDB";

mongoose.createConnection(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});


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
                    res.should.be.json;

                    // show entire contents of response
                    // console.log(JSON.stringify(res.body))
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
                    products[0]["productName"].should.equal("Striped Tie");
                    products[1]["productName"].should.equal("Leather shoes");
                    products[2]["productName"].should.equal("Dress shirt");
                    products[3]["productName"].should.equal("Dress pants");
                    products[4]["productName"].should.equal("Bowtie");
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
                    products[0]["price"].should.equal(65.99);
                    products[1]["price"].should.equal(99.99);
                    products[2]["price"].should.equal(140.99);
                    products[3]["price"].should.equal(175.99);
                    products[4]["price"].should.equal(42.99);
                    done();
                });
        })

        // // Perform a POST test.
        it("Tests POST request from API.", 
             (done) => {
             const id = 5;
             chai.request(app)
                 .post(`/Product/CreateProduct`)
                 .send({_id:82,productName:"justTest",price:67.99,description:"Don't worry, just testing"})
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                     done();
                  });
         });
    });
});
