import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/Product/";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  _productsArray: Array<any>;
    _http:HttpClient;
    _id:Number;
    _productName:String;
    _editableProductName:String="";
    _errorMessage:String = "";
    _editId:Number = null;
    _singleProductNumber : number = null;
    _singleProductName: string = "";

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
                this.getAllProducts();         
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = error;                
            });
    }

}
