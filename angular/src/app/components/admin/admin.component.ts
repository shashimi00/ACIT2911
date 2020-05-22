import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/Product/";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  _productsArray: Array<any>;
    _http:HttpClient;
    _id:Number;
    _productName:String;
    _errorMessage:String = "";

    // Since we are using a provider above we can receive 
    // an instance through a constructor.
    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllProducts();
    }

    
  ngOnInit() {
  }

    getAllProducts() {
      let url = BASE_URL + 'Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._productsArray = result.products;
          }, 

          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
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
              this.getAllProducts(); 
          },
          // An error occurred. Data is not received. 
          error  => {
            this._errorMessage = error; 
          });
    }
}
