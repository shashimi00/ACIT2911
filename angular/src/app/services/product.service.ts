import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from 'src/app/models/product'
const BASE_URL = "http://localhost:1337/Product/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _productsArray: Array<any>;
  _http:HttpClient;
  _id:Number;
  _productName:String;
  _editableProductName:String="";
  _errorMessage:String = "";
  _editId:Number = null;
  _singleProductNumber : number = null;
  _singleProductName: string = "";


  // products: Product[] = [
  //   new Product(1, 'Product 1', 'This is the product 1 description. ', 100),
  //   new Product(2, 'Product 2', 'This is the product 2 description. ', 150),
  //   new Product(3, 'Product 3', 'This is the product 3 description. ', 50),
  //   new Product(4, 'Product 4', 'This is the product 4 description. ', 200),
  //   new Product(5, 'Product 5', 'This is the product 5 description. ', 100),
  //   new Product(6, 'Product 6', 'This is the product 6 description. ', 150),
  //   new Product(7, 'Product 7', 'This is the product 7 description. ', 250),
  //   new Product(8, 'Product 8', 'This is the product 8 description. ', 300),
  // ]

  // constructor() { }

  // getProducts(): Product[] {
  //   //TODO: Populate products from an API and return an Observable
  //   return this.products
  // }
  constructor(private http: HttpClient) {
    this._http = http;
    this.getProducts();
    // this.items = [];  
}

  getProducts() {
    let url = BASE_URL + 'Index'
    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {
            this._productsArray = result.products;
            return this._productsArray
        }, 

        error =>{
          // Let user know about the error.
            this._errorMessage = error;
            return this._errorMessage
        })
  }

  getProduct(id) {
    let url = BASE_URL + 'Detail?_id=' + id;

    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {          
            this._singleProductName = result.product.productName;
            this._singleProductNumber = result.product._id;
        }, 

        error =>{
          // Let user know about the error.
            this._errorMessage = error;
        })
  }


  createProduct() {
    // This free online service receives post submissions.
    this.http.post(BASE_URL + "CreateProduct",
        {
            _id:  this._id,
            productName:   this._productName,
        })
    .subscribe(
        // Data is received from the post request.
        (data) => {
            // Inspect the data to know how to parse it.
            console.log("POST call successful. Inspect response.", 
                        JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
            this.getProducts();
              
        },
        // An error occurred. Data is not received. 
        error => {
            this._errorMessage = error;                
        });
}

deleteProduct(_id) {

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
    "body": { _id:_id}
  };

  let url = BASE_URL + "Delete"
  this.http.delete(  url , httpOptions) 
  .subscribe(
      // Data is received from the post request.
      (data) => {
          this._errorMessage = data["errorMessage"];
          this.getProducts(); 
      },
      // An error occurred. Data is not received. 
      error  => {
        this._errorMessage = error; 
      });
}

updateProduct() {
  // This free online service receives post submissions.
  this.http.put(BASE_URL + "Update",
      {
          _id:         this._editId,
          productName: this._editableProductName,
      })
  .subscribe(
      // Data is received from the post request.
      (data) => {
          // Inspect the data to know how to parse it.
          console.log("PUT call successful. Inspect response.", 
                      JSON.stringify(data));
          this._errorMessage = data["errorMessage"];
          this.getProducts();         
      },
      // An error occurred. Data is not received. 
      error => {
          this._errorMessage = error;                
      });
}
}


